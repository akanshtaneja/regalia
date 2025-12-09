import React, { useEffect, useState } from "react";
import { FaBoxOpen } from "react-icons/fa";
import { MdUploadFile } from "react-icons/md";
import { Footer } from "../Components/common/Footer";
import Lottie from "lottie-react";
import returnAnimation from "../assets/Animations/return.json";
import { Link } from "react-router-dom";

export const Return = () => {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [savedOrders, setSavedOrders] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // order id from local storage
  useEffect(() => {
    const orderPlaced = JSON.parse(localStorage.getItem("orders")) || [];
    setSavedOrders(orderPlaced);
  }, []);

  const validateForm = () => {
    let tempErrors = {};

    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        tempErrors.file = "Only JPG or PNG images are allowed.";
      }

      if (file.size > 2 * 1024 * 1024) {
        tempErrors.file = "File size must be under 2MB.";
      }
    }

    if (details.length < 20) {
      tempErrors.details = "Minimum length should be 20 characters.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // submit handle
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setShowPopup(true);
  };

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
          <div className="bg-white w-[300px] p-7 rounded-2xl shadow-2xl text-center ">
            <Lottie
              animationData={returnAnimation}
              loop={true}
              className="w-32 mx-auto"
            />

            <p className="text-gray-900 font-semibold text-base mt-2">
              Your return request submitted{" "}
            </p>

            <p className="text-gray-500 text-sm mt-1">
              Thank you for choosing{" "}
              <span className="font-semibold">Regalia</span>
            </p>

            {/* ok btn */}
            <Link to="/">
              <button
                onClick={() => setShowPopup(false)}
                className="mt-5 w-full py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition"
              >
                OK
              </button>
            </Link>
          </div>
        </div>
      )}

      <main className="min-h-screen bg-gray-100 py-16 px-4" >

        {/* main container */}
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-10 border border-gray-200">
          <div className="text-center">
            <FaBoxOpen className="text-5xl text-red-500 mx-auto" />
            <h1 className="text-3xl font-bold text-gray-800 mt-4">
              Return Request
            </h1>

            <p className="text-gray-600 mt-2">
              Tell us what went wrong we will fix it fast.
            </p>
          </div>

          {/* main form  */}
          <form onSubmit={handleSubmit} className="mt-10 space-y-6">

            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 mt-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                Return Policy
              </h3>

              <ul className="text-sm text-gray-600 space-y-2">
                <li>
                  • Returns accepted within <b>7 days</b> of delivery
                </li>
                <li>
                  • Item must be unused, undamaged & in original packaging
                </li>
                <li>• All tags, accessories & invoice are mandatory</li>
                <li>
                  • Refund processed within <b>3–5 business days</b> after
                  inspection
                </li>
              </ul>
            </div>

            <div>
              <label htmlfor="orderId" className="text-sm font-semibold text-gray-700">
                Order ID *
              </label>

              <select
              id = "orderId"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full px-4 py-3 mt-2 border rounded-lg outline-none"
                required
              >
                <option value="">Select Order ID</option>
                {savedOrders.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.id}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlfor="returnReason" className="text-sm font-semibold text-gray-700">
                Return Reason *
              </label>

              <select
              id = "returnReason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-4 py-3 mt-2 border rounded-lg outline-none"
                required
              >
                <option value="">Select a reason</option>
                <option value="wrong">Wrong item delivered</option>
                <option value="damaged">Product damaged</option>
                <option value="quality">Poor quality</option>
                <option value="size">Size/fit issue</option>
                <option value="late">Late delivery</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="details" className="text-sm font-semibold text-gray-700">
                Details
              </label>

              <textarea
              id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows="4"
                placeholder="Explain your issue (min 20 chars)"
                className={`w-full mt-2 px-4 py-3 border rounded-lg resize-none outline-none ${
                  errors.details ? "border-red-500" : "border-gray-300"
                }`}
                required
              ></textarea>

              {errors.details && (
                <p className="text-red-500 text-sm mt-1">{errors.details}</p>
              )}
            </div>

            <div>
              <label htmlfor="img" className="text-sm font-semibold text-gray-700">
                Upload Product Image (optional)
              </label>

              <div className="flex items-center gap-3 mt-2 bg-gray-50 border border-gray-300 rounded-lg p-3">
                <MdUploadFile className="text-2xl text-gray-600" />

                <input
                id="img"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="text-sm text-gray-700"
                  required
                />
              </div>

              {errors.file && (
                <p className="text-red-500 text-sm mt-1">{errors.file}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-6 rounded-lg bg-black text-white font-semibold text-lg shadow-md hover:bg-gray-800 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
};
