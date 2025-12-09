import Lottie from "lottie-react";
import success from "../../assets/Animations/success.json";
import { Link } from "react-router-dom";

export const SuccessPopup = ({ onClose }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      
      <Lottie animationData={success} loop={false} className="w-40 mb-4" />{" "}
      {/* main heading */}
      <h2 className="text-2xl font-bold text-gray-800">Hurray! 🎉</h2>{" "}
      <p className="text-gray-500 text-sm mt-1">
       
        Your order has been placed successfully.
      </p>
      <div className="flex gap-3 mt-6">
        
        <Link to="/orders">
          
          <button
            className="border border-gray-300 px-5 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            onClick={onClose}
          >
            
            View Order
          </button>
        </Link>
        <Link to="/products">
          
          <button
            onClick={onClose}
            className="bg-black hover:bg-gray-900 text-white px-5 py-2 rounded-lg transition"
          >
            
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};
