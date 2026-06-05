import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";


import Home from "./pages/HomePage/Home";
import About from "./pages/AboutPage/About";
import Services from "./pages/ServicesPage/Services";
import Contact from "./pages/ContactPage/Contact";

import Policy from "./pages/PolicyPages/Policy";

function App() {
  
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contacts" element={<Contact />} />

      {/* Policy Pages */}
      <Route path="/privacy-policy" element={<Policy />} />
      <Route path="/cookies-policy" element={<Policy />} />
      <Route path="/terms-and-conditions" element={<Policy />} />


    </Routes>
    <Footer />
    </BrowserRouter>
  )
}

export default App
