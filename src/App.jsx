import { useState, useCallback, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./index.css";
import { Navbar } from "./Components/common/Navbar.jsx";
import {ScrollToTop} from './Components/common/ScrollToTop.jsx'
import { DataProvider } from "./Context/DataContext.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import  {LocationProvider} from './Context/LocationContext.jsx'
import { debounce } from "./utils/debounce.jsx";
import { Protected } from "./Routes/Protected.jsx";
import { WishlistProvider } from "./Context/WishlistContext.jsx";
import {Home} from "./Pages/Home.jsx"
const Login = lazy(() => import("./Pages/Login.jsx"));
const Products = lazy(() => import("./Pages/Products.jsx"));
const About = lazy(() => import("./Pages/About.jsx"));
const Contact = lazy(() => import("./Pages/Contact.jsx"));
const Payment = lazy(() => import("./Pages/MiniCart/Payment.jsx"));
const Return = lazy(() => import("./Pages/Return.jsx"));
const Faq = lazy(() => import("./Pages/Faq.jsx"));
const Order = lazy(() => import("./Pages/Order.jsx"));
const SignUp = lazy(() => import("./Pages/SignUp.jsx"));
const Wishlist = lazy(() => import("./Pages/Wishlist.jsx"));
const DetailPage = lazy(() => import("./Pages/DetailPage.jsx"));


function App() {
  const [search, setSearch] = useState("");
  const [localSearch, setLocalSearch] = useState("");
   const [user, setUser] = useState()

   useEffect(() => {
       const storedUser = JSON.parse(localStorage.getItem("user"))
       setUser(storedUser)
     }, [])


  const debouncedSearch = useCallback(
    debounce((value) =>{
      setSearch(value)
    }, 500), 
    []
  )

  const handleGlobalSearch = (value) => {
    setLocalSearch(value)
  debouncedSearch(value);
};

  return (
    <>
  <LocationProvider> 
      <DataProvider>
        <CartProvider>
          <WishlistProvider>
          <Navbar  search={localSearch} onSearchChange={handleGlobalSearch} user={user} setUser={setUser}/>
          <ScrollToTop />
          <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setUser={setUser}/>} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/products" element={<Products search={search} setSearch={setSearch}/>} />
            <Route path="/products/:id" element={<DetailPage />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/about" element={<About />} />

            <Route element={<Protected />}>
            <Route path="/contact" element={<Contact />} />
            <Route path="/return" element={<Return/>} />
            <Route path="/checkout" element={<Payment />} />          
            <Route path="/orders" element={<Order />} />
            <Route path="/wishlist" element={<Wishlist />} /> 
           </Route>
            
          </Routes>
          </Suspense>
 </WishlistProvider>
        </CartProvider>
      </DataProvider>
      </LocationProvider>

      <ToastContainer
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}

export default App;


