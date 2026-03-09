import React, {memo} from "react";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";
import  Navbar  from "../components/organisms/Navbar";
import { Footer } from "../components/organisms/Footer"

const Contact = () => {
  return (
    <>
    
    <main className="min-h-screen bg-gray-50 py-14 px-5">

      {/* container */}
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-12">

        {/* main heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-black">
            Contact Regalia
          </h1>
          <p className="text-gray-600 mt-2"> We’d love to hear from you. Our team is here to help anytime.</p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

         
          <div className="space-y-8">

            
            <div className="flex items-start gap-4">
              <span className="text-black text-3xl" aria-hidden='true'><MdLocationOn  /></span>
        <div>
                <h3 className="text-xl font-semibold text-gray-800">Our Location</h3>
                <a href="https://www.google.com/maps/dir//Pari+Chowk,+Greater+Noida,+Uttar+Pradesh/@28.4652554,77.5109279,17z/data=!4m17!1m8!3m7!1s0x390cc1d5cec6db2b:0x565df5a0cea80aa4!2sPari+Chowk,+Greater+Noida,+Uttar+Pradesh!3b1!8m2!3d28.4652554!4d77.5109279!16s%2Fg%2F11hd6ljkb5!4m7!1m0!1m5!1m1!1s0x390cc1d5cec6db2b:0x565df5a0cea80aa4!2m2!1d77.5109279!2d28.4652554?entry=ttu&g_ep=EgoyMDI1MTExMi4wIKXMDSoASAFQAw%3D%3D"
                className="text-gray-600 hover:text-black "
                target="_blank">
                Regalia HQ, Noida, India
                </a>
                <p className="text-gray-600"></p>
              </div>
            </div>

            
            <div className="flex items-start gap-4">
              <span className="text-black text-3xl" aria-hidden='true'><MdEmail /></span>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Email Us</h3>
                <p className="text-gray-600">support@regalia.com</p>
              </div>
            </div>

            
            <div className="flex items-start gap-4">
              <span className="text-black text-3xl" aria-hidden='true'><MdPhone /></span>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Call Us</h3>
                <p className="text-gray-600">+91 2725272527</p>
              </div>
            </div>

            
            <div className="bg-gray-100 p-4 rounded-xl">
              <h4 className="text-lg font-semibold text-gray-800">Working Hours</h4>
              <p className="text-gray-600 text-sm">Mon – Sat: 9 AM – 8 PM</p>
            </div>
          </div>

          
          <form className="space-y-5">
            <div>
              <label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</label>
              <input
                id = 'fullName'
                type="text"
                placeholder="Akansh Taneja"
                className="w-full mt-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
              <input
                id='email'
                type="email"
                placeholder="you@example.com"
                className="w-full mt-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg outline-none"
              />
            </div>

            <div>
              <label htmlFor='message' className="text-sm font-medium text-gray-700">Your Message</label>
              <textarea
                id="message"
                rows="5"
                placeholder="Write your message..."
                className="w-full mt-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-2 rounded-lg shadow-lg transition">
              Send Message
            </button>
          </form>

        </div>

      </div>
    </main>
    <Footer />
    </>
  );
};

export default React.memo(Contact)