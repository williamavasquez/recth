// controller/truckController.ts
import { Request, Response } from 'express';
import { FoodTruck } from '../types';
import axios from 'axios';
import haversine from 'haversine';

// import  NodeGeocoder from 'node-geocoder';

const API_URL = 'https://data.sfgov.org/resource/jjew-r69b.json';

// const geoOptions: NodeGeocoder.Options = {
//   provider: "geocodio",
// };

export const getFoodTrucks = async (req: Request, res: Response): Promise<void> => {
  const {time, coordinates, customAddress} = req.body
  const {latitude,longitude} = coordinates

  try {
    // const geocoder = NodeGeocoder(geoOptions)
    // const ee = await geocoder.geocode('11006 connemara ct, bakersfield');
    // console.log(ee)
    // if(req.body.customAddress) {

    // }

    const response = await axios.get(API_URL);
    const trucks: FoodTruck[] = response.data;

    const trucks5MileAway:FoodTruck[]= trucks.filter((truck)=> {
      let isIn5MileRadius = haversine({
        latitude: latitude,
        longitude: longitude
      }, {
        latitude: Number(truck.latitude), 
        longitude: Number(truck.longitude)
      }, {threshold: 5, unit: 'mile'})

      if(isIn5MileRadius){
        let openiningHour = truck.start24.split ( ":" )[0];
        let closingHour = truck.end24.split ( ":" )[0];
        
        return openiningHour<time && time <closingHour
      }
      
      return false
    })

    res.status(200).send(trucks5MileAway.splice(0,3))

  } catch (error) {
    console.error('Error fetching food trucks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

