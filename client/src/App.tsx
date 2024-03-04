import  { FC, useState } from 'react';
import { FoodTruck } from './types';
import './App.css'

import FoodTruckCards from './components/cards';
import CustomerLocation from './components/customerLocation';
import ResetButton from './components/resetButton';

const App: FC = () => {
  const [trucks, setTrucks] = useState<FoodTruck[]>([])

  return (
    <div>
      <h1 className='mb-5'>I'm Hungry NOW! </h1>
      {
        trucks.length == 0 
        ? <CustomerLocation updateTrucks={setTrucks} />
        : <ResetButton reset={setTrucks}/>  
      }

      {
        trucks.map((item, i) => <FoodTruckCards key={i} {...item} />)
      }

    </div>
  );
};

export default App;
