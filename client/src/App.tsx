import React, { useEffect, useState } from 'react';
import useGeoLocation from './hooks/getLocation';
import { FoodTruck } from './types';
import './App.css'

import FoodTruckCards from './components/cards';





const baseURL = 'http://localhost:3000/api'
const App: React.FC = () => {
  const { coordinates, getLocation } = useGeoLocation();
  const [customAddress, setCustomAddress] = useState<string>('');
  const [trucks, setTrucks] = useState<FoodTruck[]>([])

  useEffect(() => {
    fetchTrucks()
  }, [coordinates])

  const fetchTrucks = async () => {
    if ((coordinates.latitude && coordinates.longitude) || customAddress) {
      let res = await fetch(`${baseURL}/foodtrucks`,
        {
          method: 'POST', 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({coordinates:{
            latitude: 37.75489622541768,
            longitude: -122.38930488970668
          }, customAddress, time: new Date().getHours()})
        })
      let data: FoodTruck[] = await res.json()
      console.log(data)
      setTrucks(data)
    }
  }

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAddress(event.target.value);
  };

  return (
    <div>
      <h1>I'm Hungry NOW! </h1>

      {
        !coordinates.requestAddress
          ? <button className="m-3 bg-cyan-600" onClick={getLocation}>Find Food Trucks Open Now</button>
          : <div>
            <input
              type="text"
              placeholder="Enter your address"
              value={customAddress}
              onChange={handleAddressChange}
            />
            <button onClick={fetchTrucks}>Submit</button>
          </div>
      }

        {
          trucks.map((item)=> <FoodTruckCards {...item}/>)
        }
    </div>
  );
};

export default App;
