import React, { useState, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Lottie from "lottie-react";
import loader from "../assets/Animations/Trailloading.json";
import axios from "axios";

const Login = ({setUser}) => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [apiMessage, setApiMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // form validation
  const validate = () => {
    const errors = {};
    const regex = /\S+@\S+\.\S+/;

    if (!formValues.email){
      errors.email = "Email is required";
    } 
    else if (!regex.test(formValues.email)) {
      errors.email = "Invalid email";
    }

    if (!formValues.password) {
      errors.password = "Password required";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length) return;
    setLoading(true);

    axios
      .post("https://capstone-akansh.onrender.com/validatePassword", {
        email: formValues.email,
        password: formValues.password,
      })
      .then((res) => {
        setApiMessage(res.data.message);

        if (res.data.message === "Login Successful") {
          localStorage.setItem("user", JSON.stringify(res.data.user));        
          localStorage.setItem("LoginId", JSON.stringify(res.data.user.id) )  // login id
          setUser(res.data.user);
          setTimeout(() => navigate("/"), 800);
        }
      })
      .catch((err) => {
        if (err.response) setApiMessage(err.response.data.message);
        else setApiMessage("Server error");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-[360px] bg-white p-6 rounded-lg shadow-md border">

        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* email */}
          <div>
            <label htmlFor='email' className="text-sm text-gray-700">Email</label>
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

          {/* password */}
          <div>
            <label htmlFor='password' className="text-sm text-gray-700">Password</label>
            <div className="relative">
              <input
                id="password"
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

          {/* button */}
          {!loading ? (
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900"
            >
              Login
            </button>
          ) : (
            <div className="w-full flex justify-center">
              <Lottie
                animationData={loader}
                style={{ height: 60 }}
                loop={true}
              />
            </div>
          )}

          {/* api msg */}
          {apiMessage && (
            <p
              className={`text-center text-sm ${
                apiMessage === "Login Successful" ? "text-green-600" : "text-red-500"
              }`}
            >
              {apiMessage}
            </p>
          )}
        </form>

        <p className="text-center text-gray-700 mt-5 text-sm">
          New here?
          <Link to="/signup" className="text-black font-semibold ml-1 hover:underline">
            Create an account
          </Link>
        </p>

      </div>
    </div>
  );
};


export default React.memo(Login)