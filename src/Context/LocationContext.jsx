import React, {createContext, useState, useEffect, useContext, useMemo,} from "react";
import axios from "axios";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [locationData, setLocationData] = useState({
    city: "Detecting...",
    locality: "",
    pincode: "",
    state: "",
    country: "",
    error: false,
    denied: false,
  });

  
  const locationNotFound = (isDenied = false) => {
    setTimeout(() => {
      setLocationData((prev) => ({...prev,
        city: "Location not found",
        error: true,
        denied: isDenied,
      }));
    }, 2000);
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      locationNotFound(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

          const location = await axios.get(url);
          const data = location.data;

          setLocationData({
            city: data.city || "Unknown",
            locality: data.locality || "",
            pincode: data.postcode || "",
            state: data.principalSubdivision || "",
            country: data.countryName || "",
            error: false,
            denied: false,
          });
        } catch (err) {
          // API error
          locationNotFound(false);
        }
      },

      (error) => {
        if (error.code === 1) {
          locationNotFound(true);
        } else {
          locationNotFound(false);
        }
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  const locationValue = useMemo(
    () => ({ locationData }),
    [locationData]
  );

  return (
    <LocationContext.Provider value={locationValue}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocations = () => useContext(LocationContext);
