import { useState } from 'react';

interface Coordinates {
  latitude: number | null;
  longitude: number | null;
  requestAddress: boolean;
}

const useGeoLocation = () => {
  const [coordinates, setCoordinates] = useState<Coordinates>({
    latitude: null,
    longitude: null,
    requestAddress: false
  });

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            requestAddress: false
          });
        },
        () => {
          setCoordinates({
            latitude: null,
            longitude: null,
            requestAddress: true
          });
        }
      );
    } else {
      setCoordinates({
        latitude: null,
        longitude: null,
        requestAddress: true
      });
    }
  };

  return { coordinates, getLocation };
};

export default useGeoLocation;
