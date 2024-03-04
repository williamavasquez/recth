// controller/truckController.ts
import { Request, Response } from 'express';
import { FoodTruck, Coordinates } from '../types';
import axios from 'axios';
import haversine from 'haversine';


const API_URL = 'https://data.sfgov.org/resource/jjew-r69b.json';

export const getFoodTrucks = async (req: Request, res: Response): Promise<void> => {
  const { time, coordinates, customAddress } = req.body
  let searchCoordinates: Coordinates | null = null;

  if (customAddress) {
    const customAddressCoordinates = await geocodeAddress(customAddress);
    if (customAddressCoordinates) {
      searchCoordinates = customAddressCoordinates;
    }
  }

  if (coordinates && !searchCoordinates) {
    searchCoordinates = coordinates;
  }

  if (!searchCoordinates) {
    res.status(200).send([]);
    return;
  }

  try {
    const response = await axios.get(API_URL);
    const trucks: FoodTruck[] = response.data;


    const trucks5MileAway: FoodTruck[] = trucks.filter((truck) => {
      const truckCoords: Coordinates = {
        latitude: Number(truck.latitude),
        longitude: Number(truck.longitude),
      };

      const distance = haversine(searchCoordinates as Coordinates, truckCoords, { unit: 'mile' });

      if (distance <= 5) {
        const openingHour = Number(truck.start24.split(':')[0]);
        const closingHour = Number(truck.end24.split(':')[0]);
        return time >= openingHour && time <= closingHour;
      }

      return false;
    });

    res.status(200).send(trucks5MileAway.splice(0, 3))

  } catch (error) {
    console.error('Error fetching food trucks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


async function geocodeAddress(address: string): Promise<Coordinates | null> {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: address,
        format: 'json',
      },
    });

    if (response.data && response.data.length > 0) {
      return {
        latitude: parseFloat(response.data[0].lat),
        longitude: parseFloat(response.data[0].lon),
      };
    } else {
      console.error('No results found for the address:', address);
      return null;
    }
  } catch (error) {
    console.error('Geocoding failed with error:', error);
    return null;
  }
}