import { Dispatch, useState } from 'react';

interface Coordinates {
  latitude: number | null;
  longitude: number | null;
  requestAddress: boolean;
}

interface Props {
  isLoading: Dispatch<React.SetStateAction<boolean>>;
}

const useGeoLocation = ({ isLoading }: Props) => {
  const [coordinates, setCoordinates] = useState<Coordinates>({
    latitude: null,
    longitude: null,
    requestAddress: false
  });

  const getLocation = () => {
    isLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            requestAddress: false
          });
          isLoading(false)
        },
        () => {
          setCoordinates({
            latitude: null,
            longitude: null,
            requestAddress: true
          });
          isLoading(false)
        }
      );
    } else {
      setCoordinates({
        latitude: null,
        longitude: null,
        requestAddress: true
      });
      isLoading(false)
    }
  };

  return { coordinates, getLocation };
};

export default useGeoLocation;
