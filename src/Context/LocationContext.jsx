import React from "react";
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [locationData, setLocationData] = useState({
    city: "Detecting...",
    locality: "",
    pincode: "",
    state: "",
    country: "",
  });

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      console.log(latitude, longitude);

      const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en
`;

      try {
        const location = await axios.get(url);
        // console.log(location);
        const data = location.data;
        setLocationData({
          city: data.city || "Unknown",
          locality: data.locality || "",
          pincode: data.postcode || "",
          state: data.principalSubdivision || "",
          country: data.countryName || "",
          
        });
        console.log("here is your location", data)
        
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  console.log(locationData)

  return (
    <LocationContext.Provider value={{ locationData}}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocations = () => useContext(LocationContext);