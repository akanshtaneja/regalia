import React, { memo } from "react";
import { CiLocationOn } from "react-icons/ci";
import { useLocations } from "../../context/LocationContext";

const LocationDetect = () => {
  const { locationData } = useLocations();

  const isDetecting = locationData.city === "Detecting...";
  const isError = locationData.error;

  return (
    <button
      aria-label="Detect delivery location"
      className=" flex items-center gap-1 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded cursor-pointer"
    >
      <CiLocationOn
        className="h-8 w-8 text-gray-700"
        aria-hidden="true"
      />

      <div>
       
        {isDetecting && (
          <span className="text-sm font-semibold text-gray-600">
            Detecting...
          </span>
        )}

        
        {!isDetecting && isError && (
          <span className="text-sm font-semibold text-gray-800">
            Not found
          </span>
        )}

        
        {!isDetecting && !isError && (
          <div className="-space-y-1 font-semibold">
            <p className="text-[12px] text-gray-600">
              Deliver to
            </p>
            <p className="text-sm text-gray-800">
              {locationData.locality || locationData.city}
            </p>
          </div>
        )}
      </div>
    </button>
  );
};

export default memo(LocationDetect);
