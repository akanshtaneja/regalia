import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Payment } from "./Payment";


const schema = yup.object({
  firstName: yup.string().required("First name required"),
  lastName: yup.string().required("Last name required"),
  phone: yup.string().matches(/^[0-9]{10}$/, "Enter valid 10-digit number").required("Phone required"),
  email: yup.string().email("Invalid email").required("Email required"),
  address: yup.string().required("Address required"),
  city: yup.string().required("City required"),
  state: yup.string().required("State required"),
  pincode: yup.string().matches(/^[0-9]{6}$/, "Enter valid 6-digit pincode").required("Pincode required"),
});

export const Checkout = ({ subtotal, setStep, setCheckoutData, checkoutData }) => {
  const { register, handleSubmit, watch, formState: { errors }, } = useForm({
    defaultValues: {
      shipMethod: "free",
    },
    resolver: yupResolver(schema),
  });

const platformFee = 7
  const selectedMethod = watch("shipMethod");
  const shipping = selectedMethod === "express" ? 100 : 0;
  const total = subtotal + shipping + platformFee;

  

  const onSubmit = (data) => {
    data.shippingAmount = shipping;
    data.totalAmount = total;
    console.log("Checkout Data:", data);
    setCheckoutData({
       shipping,
    platformFee,
    total
    })
    setStep(3)
    
  };

  return (
    <>
      {/* bck to cart */}
      <div className="py-2 px-5">
        <p
          onClick={() => setStep(1)}
          className="text-blue-600 text-sm cursor-pointer hover:underline"
        >
          ← Back to Cart
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="h-full overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-5 pt-2 pb-4">

          {/* left side form*/}
          <div className="lg:col-span-2 space-y-5">

            <h1 className="text-lg font-semibold">Shipping Address</h1>

            {/* name*/}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>

              
              <input
                type="text"
                placeholder="First Name"
                {...register("firstName")}
                className="border p-2.5 rounded-md w-full text-[14px]"
              />
              {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                )}
                </div>

<div>
              <input
                type="text"
                placeholder="Last Name"
                {...register("lastName", { required: true })}
                className="border p-2.5 rounded-md w-full text-[14px]"
              />
                 {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                )}

              </div>
            </div>
         
            {/* Email / Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
              <input
                type="email"
                placeholder="Email Address"
                {...register("email", { required: true })}
                className="border p-2.5 rounded-md w-full text-[14px]"
              />
              {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
                </div>

<div>
              <input
                type="tel"
                placeholder="Phone Number"
                {...register("phone", { required: true })}
                className="border p-2.5 rounded-md w-full text-[14px]"
              />
               {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
            </div>
            </div>
           

            {/* Address */}
            
            <div>
              <input
                type="text"
                placeholder="Full Address"
                {...register("address")}
                className="w-full border p-2.5 rounded-md resize-none"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>

            {/* City / State / Zip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
              <input
                type="text"
                placeholder="City"
                {...register("city")}
                className="border p-2.5 rounded-md w-full text-[14px]"
              />
              {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city.message}</p>
                )}
                </div>

<div>
              <input
                type="text"
                placeholder="State"
                {...register("state")}
                className="border p-2.5 rounded-md w-full text-[14px]"
              />
              {errors.state && (
                  <p className="text-red-500 text-sm">{errors.state.message}</p>
                )}
              </div>
<div>
              <input
                type="text"
                placeholder="Pincode"
                {...register("pincode", { required: true })}
                className="border p-2.5 rounded-md w-full text-[14px]"
              />
              {errors.pincode && (
                  <p className="text-red-500 text-sm">{errors.pincode.message}</p>
                )}
              </div>
            </div>

            {/* Method */}
            <h1 className="text-lg font-semibold pt-2">Shipping Method</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Free */}
              <label className="flex items-center gap-2 border p-3 rounded-xl cursor-pointer">
                <input type="radio" value="free" {...register("shipMethod")} />
                <div>
                  <p className="font-medium text-md">Free Delievery</p>
                  <p className="text-sm text-gray-600">5-7 Days</p>
                </div>
                <span className="ml-auto font-semibold">₹0</span>
              </label>

              {/* express*/}
              <label className="flex items-center gap-2 border p-3 rounded-xl cursor-pointer hover:border-black">
                <input type="radio" value="express" {...register("shipMethod")} />
                <div>
                  <p className="font-medium">Express delievery</p>
                  <p className="text-sm text-gray-600">1-2 days</p>
                </div>
                <span className="ml-auto font-semibold">₹100</span>
              </label>
            </div>
          </div>

          {/* order summary */}
          <div className="border rounded-xl p-6 space-y-4 h-fit shadow-sm bg-white sticky top-5">
            <h2 className="text-xl font-semibold">Order Summary</h2>

            <div className="flex justify-between text-gray-700">
              <p>Subtotal</p>
              <p>₹{subtotal}</p>
            </div>

            <div className="flex justify-between text-gray-700">
              <p>Shipping</p>
              <p>₹{shipping}</p>
            </div>

            <div className="flex justify-between text-gray-700">
              <p>Platform Fee</p>
              <p>₹{platformFee}</p>
            </div>

            <hr />

            <div className="flex justify-between text-lg font-bold">
              <p>Total</p>
              <p>₹{total}</p>
            </div>

            <button
              type="submit"
              className="w-full mt-3 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
            >
              Continue to Payment
            </button>
          </div>

        </div>
      </form>
    </>
    
  );
};
