import { useState, useCallback, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./index.css";
import Navbar from "./components/organisms/Navbar.jsx";
import { ScrollToTop } from "./components/organisms/ScrollToTop.jsx";
import { DataProvider } from "./context/DataContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { LocationProvider } from "./context/LocationContext.jsx";
import { Protected } from "./routes/Protected.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { Home } from "./pages/Home.jsx";
const Login = lazy(() => import("./pages/Login.jsx"));
const Products = lazy(() => import("./pages/Products.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Payment = lazy(() => import("./components/organisms/Payment.jsx"));
const Return = lazy(() => import("./pages/Return.jsx"));
const Faq = lazy(() => import("./pages/Faq.jsx"));
const Order = lazy(() => import("./pages/Order.jsx"));
const SignUp = lazy(() => import("./pages/SignUp.jsx"));
const Wishlist = lazy(() => import("./pages/Wishlist.jsx"));
const DetailPage = lazy(() => import("./pages/DetailPage.jsx"));

function App() {

  const [user, setUser] = useState();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);


  return (
    <>
      <LocationProvider>
        <DataProvider>
          <CartProvider>
            <WishlistProvider>
              <Navbar
                user={user}
                setUser={setUser}
              />
              <ScrollToTop />
              <Suspense
                fallback={<div className="text-center mt-10">Loading...</div>}
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login setUser={setUser} />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route
                    path="/products"
                    element={<Products />}
                  />
                  <Route path="/products/:id" element={<DetailPage />} />
                  <Route path="/faq" element={<Faq />} />
                  <Route path="/about" element={<About />} />

                  <Route element={<Protected />}>
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/return" element={<Return />} />
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
