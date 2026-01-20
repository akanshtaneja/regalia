import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IoClose } from "react-icons/io5";

const schema = yup.object({
  firstName: yup.string().required("First name required"),
  lastName: yup.string().required("Last name required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Enter valid 10-digit number")
    .required("Phone required"),
  email: yup.string().email("Invalid email").required("Email required"),
  address: yup.string().required("Address required"),
  city: yup.string().required("City required"),
  state: yup.string().required("State required"),
  pincode: yup
    .string()
    .matches(/^[0-9]{6}$/, "Enter valid 6-digit pincode")
    .required("Pincode required"),
});

export const Checkout = ({
  subtotal,
  cartItems,
  setStep,
  setCheckoutData,
  onClose,
}) => {
  const {

    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { shipMethod: "free" },
    resolver: yupResolver(schema),
  });

  const inputClass =
    "border px-2.5 py-1.5 rounded-md w-full text-xs focus:outline-none focus:ring-1 focus:ring-black";

  const platformFee = 7;
  const shippingMethod = watch("shipMethod");
  const shipping = shippingMethod === "express" ? 100 : 0;
  const total = subtotal + shipping + platformFee;

  const onSubmit = (data) => {
    setCheckoutData({
      ...data,
      cartItems,
      shipping,
      platformFee,
      total,
    });
    setStep(3);
  };

  return (
    <>
      {/* header */}
      <div className="px-4 py-2 flex justify-between items-center border-b">
        <p
          onClick={() => setStep(1)}
          className="text-xs text-blue-600 cursor-pointer hover:underline"
        >
          ← Back to Cart
        </p>
        <button onClick={onClose}>
          <IoClose size={20} />
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full overflow-y-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 px-4 py-3">
          {/* left side*/}
          <div className="lg:col-span-2 space-y-5">
            {/* contact info */}
            <div className="space-y-2">
              <h2 className="text-sm font-semibold">Contact Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <input
                    placeholder="Email Address"
                    {...register("email")}
                    className={inputClass}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    placeholder="Phone Number"
                    {...register("phone")}
                    className={inputClass}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* shipping address info */}
            <div className="space-y-2">
              <h2 className="text-sm font-semibold">Shipping Address</h2>

              <div className="grid grid-cols-2 gap-3">
                <input
                  placeholder="First Name"
                  {...register("firstName")}
                  className={inputClass}
                />

                <input
                  placeholder="Last Name"
                  {...register("lastName")}
                  className={inputClass}
                />
              </div>

              <input
                placeholder="Full Address"
                {...register("address")}
                className={inputClass}
              />

              <div className="grid grid-cols-3 gap-3">
                <input
                  placeholder="City"
                  {...register("city")}
                  className={inputClass}
                />

                <input
                  placeholder="State"
                  {...register("state")}
                  className={inputClass}
                />

                <input
                  placeholder="Pincode"
                  {...register("pincode")}
                  className={inputClass}
                />
              </div>
            </div>

            {/* shipping method */}
            <div className="space-y-2">
              <h2 className="text-sm font-semibold">Shipping Method</h2>

              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-3 border px-3 py-2 rounded-md text-xs cursor-pointer">
                  <input
                    type="radio"
                    value="free"
                    {...register("shipMethod")}
                  />
                  <span className="font-medium">Free Delivery</span>
                  <span className="text-gray-500">(5–7 days)</span>
                  <span className="ml-auto font-semibold">₹0</span>
                </label>

                <label className="flex items-center gap-3 border px-3 py-2 rounded-md text-xs cursor-pointer">
                  <input
                    type="radio"
                    value="express"
                    {...register("shipMethod")}
                  />
                  <span className="font-medium">Express Delivery</span>
                  <span className="text-gray-500">(1–2 days)</span>
                  <span className="ml-auto font-semibold">₹100</span>
                </label>
              </div>
            </div>
          </div>

          {/* right side order summary */}
          <div className="lg:col-span-1 relative">
            <div className="border rounded-lg p-4 space-y-4 bg-white sticky bottom-4">
              <h2 className="text-sm font-semibold">Order Summary</h2>

              {/* product info */}
              <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1 scrollbar-hide">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 text-xs">
                    <img
                      src={item.image[0]}
                      alt={item.title}
                      loading="lazy"
                      className="w-12 h-12 rounded-md object-cover border"
                    />

                    <div className="flex-1">
                      <p className="font-medium line-clamp-1">{item.title}</p>
                      <p className="text-gray-500">Qty: {item.quantity}</p>
                    </div>

                    <p className="font-semibold">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <hr />

                {/* total amount info */}
              <div className="flex justify-between text-xs">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-xs">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>

              <div className="flex justify-between text-xs">
                <span>Platform Fee</span>
                <span>₹{platformFee}</span>
              </div>

              <hr />

              <div className="flex justify-between text-sm font-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md text-sm font-semibold hover:bg-gray-900"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
