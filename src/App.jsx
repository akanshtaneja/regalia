import { useState, useCallback, useEffect } from "react";
import "./App.css";
import "./index.css";
import { Login } from "./Pages/Login.jsx";
import { Home } from "./Pages/Home.jsx";
import { Routes, Route } from "react-router-dom";
import { Products } from "./Pages/Products.jsx";
import { DataProvider } from "./Context/DataContext.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import { BestSelling } from "./Components/common/BestSelling.jsx";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { About } from "./Pages/About.jsx";
import { Contact } from "./Pages/Contact.jsx";
import { SingleProduct } from "./Pages/SingleProduct.jsx";
import { Navbar } from "./Components/common/Navbar.jsx";
import { Return } from "./Pages/Return.jsx";
import { Payment } from "./Pages/MiniCart/Payment.jsx";
import {Faq} from "./Pages/Faq.jsx"
import {ScrollToTop} from './Components/common/ScrollToTop.jsx'
import  {LocationProvider} from './Context/LocationContext.jsx'
import { debounce } from "./utils/debounce.jsx";
import { Order } from "./Pages/Order.jsx";
import { SignUp } from "./Pages/SignUp.jsx";
import { Protected } from "./Routes/Protected.jsx";
import { Wishlist } from "./Pages/Wishlist.jsx";
import { WishlistProvider } from "./Context/WishlistContext.jsx";


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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setUser={setUser}/>} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/products" element={<Products search={search} setSearch={setSearch}/>} />
            <Route path="/products/:id" element={<SingleProduct />} />
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
