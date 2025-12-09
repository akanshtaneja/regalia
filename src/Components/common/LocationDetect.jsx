import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { useLocations } from "../../Context/LocationContext";

export const LocationDetect = () => {
    const { locationData } = useLocations();
  return (
    <div className="items-center gap-1 cursor-pointer hover:text-gray-700 flex">
      <CiLocationOn className="text-2xl text-gray-700 h-8 w-8" />

      {locationData.city === "Detecting..." ? (
        <span className="text-sm font-semibold text-gray-600">
          Detecting...
        </span>
      ) : (
        <div className="-space-y-1 font-semibold">
          <p className="text-[12px] text-gray-800">Deliver to</p>
          <p className="text-sm font-semibold text-gray-800">
            {locationData.locality || locationData.city}
          </p>
        </div>
      )}
    </div>
  );
};
