import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import axios from "axios";

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [apiMessage, setApiMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };


// form validationn
  const validate = () => {
    const errors = {};
    const emailRegex = /\S+@\S+\.\S+/;

    if (!formValues.name) {
      errors.name = "Name required";
    }
    if (!formValues.phone) {
      errors.phone = "Phone required";
    } 

    if (!formValues.email){
      errors.email = "Email required";
    } 
    else if (!emailRegex.test(formValues.email)){
      errors.email = "Invalid email";
    }
      

    if (!formValues.password) {
      errors.password = "Password required";
    }
    if (!formValues.confirmPassword){
      errors.confirmPassword = "Confirm password required";
    }
    else if (formValues.password !== formValues.confirmPassword){
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length) return;

    axios
      .post("http://localhost:3002/signup", formValues)
      .then((res) => {
        setApiMessage(res.data.message);
        if (res.data.message === "Signup Successful") {
          setTimeout(() => navigate("/login"), 800);
        }
      })
      .catch((err) => {
        if (err.response) setApiMessage(err.response.data.message);
        else setApiMessage("Server error");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-[400px] bg-white p-6 rounded-lg shadow-md border">

        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Sign Up
        </h2>

        <form className="space-y-5" onSubmit={handleSignup}>

          {/* Name */}
          <div>
            <label htmlFor='name' className="text-sm text-gray-700">Name</label>
            <input
              id='name'
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              className="w-full mt-1 px-3 py-2 border rounded-md outline-none"
            />
            <p className="text-red-500 text-sm">{formErrors.name}</p>
          </div>

          {/* Phone */}
          <div>
            <label htmlFor='phone' className="text-sm text-gray-700">Phone</label>
            <input
              id='phone'
              type="text"
              name="phone"
              value={formValues.phone}
              onChange={handleInputChange}
              className="w-full mt-1 px-3 py-2 border rounded-md outline-none"
            />
            <p className="text-red-500 text-sm">{formErrors.phone}</p>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="text-sm text-gray-700">Email</label>
            <input
              id='email'
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              className="w-full mt-1 px-3 py-2 border rounded-md outline-none"
            />
            <p className="text-red-500 text-sm">{formErrors.email}</p>
          </div>

          {/* Password */}
          <div>
            <label htmlFor='password' className="text-sm text-gray-700">Password</label>
            <div className="relative">
              <input
                id='password'
                type={showPassword ? "text" : "password"}
                name="password"
                value={formValues.password}
                onChange={handleInputChange}
                className="w-full mt-1 px-3 py-2 border rounded-md outline-none"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
              >
                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </span>
            </div>
            <p className="text-red-500 text-sm">{formErrors.password}</p>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="text-sm text-gray-700">Confirm Password</label>
            <input
              id='confirmPassword'
              type="password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              onChange={handleInputChange}
              className="w-full mt-1 px-3 py-2 border rounded-md outline-none "
            />
            <p className="text-red-500 text-sm">{formErrors.confirmPassword}</p>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900"
          >
            Sign Up
          </button>

          {/* API MSG*/}
          {apiMessage && (
            <p
              className={`text-center text-sm ${apiMessage === "Signup Successful"
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {apiMessage}
            </p>
          )}
        </form>

        <p className="text-center text-gray-700 mt-5 text-sm">
          Already have an account?
          <Link to="/login" className="text-black ml-1 hover:underline">
            Login
          </Link>

        </p>
      </div>
    </div>
  );
};
