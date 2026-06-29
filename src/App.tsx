import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./pages/HomePage/Home";
import About from "./pages/AboutPage/About";
import Services from "./pages/ServicesPage/Services";
import Contact from "./pages/ContactPage/Contact";

import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Forgot from "./pages/Auth/Forgot/Forgot";

import Policy from "./pages/PolicyPages/Policy";

import Elements from "./pages/ElementsPage/Elements";

function App() {
  
  return (
    <BrowserRouter>
    <Header />
    <Routes>

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot" element={<Forgot />} />

      {/* Main Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contacts" element={<Contact />} />

      {/* Policy Routes */}
      <Route path="/privacy-policy" element={<Policy />} />
      <Route path="/cookies-policy" element={<Policy />} />
      <Route path="/terms-and-conditions" element={<Policy />} />

      {/* Other Routes */}
      <Route path="/elements" element={<Elements />} />

    </Routes>
    <Footer />
    </BrowserRouter>
  )
}

export default App
