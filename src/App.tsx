import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthRoute from "./components/Routing/AuthRoute";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./pages/HomePage/Home";
import About from "./pages/AboutPage/About";
import Services from "./pages/ServicesPage/Services";
import Contact from "./pages/ContactPage/Contact";

import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Forgot from "./pages/Auth/Forgot/Forgot";
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword";
import VerifyEmail from "./pages/Auth/VerifyEmail/VerifyEmail";

import Policy from "./pages/PolicyPages/Policy";

import Elements from "./pages/ElementsPage/Elements";

import VerificationBanner from "./components/Verification/VerificationBanner/VerificationBanner";
import CookiesPopup from "./components/CookiesPopup/CookiesPopup";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

function App() {
  
  return (
    <BrowserRouter>
      <Header />
      <Routes>

        {/* Guest only Routes — redirect to / if logged in */}
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* Protected Routes — redirect to /login if not logged in */}
        <Route element={<AuthRoute requireAuth />}>
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Route>

        {/* Public Routes */}
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

      {/* Global Components */}
      <VerificationBanner />
      <CookiesPopup />
      <ScrollToTop />
      
    </BrowserRouter>
  )
}

export default App