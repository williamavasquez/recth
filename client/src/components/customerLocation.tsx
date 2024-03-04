import { useState, Dispatch, useEffect } from "react";
import useGeoLocation from "../hooks/getLocation"
import { FoodTruck } from "../types";

import InputFieldWithButton from "./inputFieldwSearch";

interface Props {
  updateTrucks: Dispatch<React.SetStateAction<FoodTruck[]>>;
}

const baseURL = 'http://localhost:3000/api'

const CustomerLocation: React.FC<Props> = ({ updateTrucks }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { coordinates, getLocation } = useGeoLocation({ isLoading: setIsLoading });
  const [customAddress, setCustomAddress] = useState<string>('');

  useEffect(() => {
    fetchTrucks()
  }, [coordinates])

  const fetchTrucks = async () => {
    if ((coordinates.latitude && coordinates.longitude) || customAddress) {
      setIsLoading(true)
      let res = await fetch(`${baseURL}/foodtrucks`,
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            coordinates: {
              latitude: "37.76037226749644", longitude: "-122.4125109516592"
            }, customAddress, time: new Date().getHours()
          })
        })
      let data: FoodTruck[] = await res.json()
      setIsLoading(false)
      updateTrucks(data)
    }
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAddress(event.target.value);
  };

  return (
    <>
      {
        isLoading &&
        <div className="fixed top-0 left-0 w-full h-full bg-cyan-500 opacity-50 flex justify-center items-center z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-white"></div>
        </div>
      }

      {
        !coordinates.requestAddress
          ? <button
            className={`m-3 bg-cyan-600 disabled:opacity-75`}
            onClick={getLocation}
            disabled={isLoading}
          >
            Find Food Trucks Open Now
          </button>
          : <InputFieldWithButton
            btnText="Search"
            btnValue={customAddress}
            handleInputChange={handleInput}
            onclick={fetchTrucks}
            isDisabled={isLoading}
          />
      }
    </>
  )
}

export default CustomerLocation