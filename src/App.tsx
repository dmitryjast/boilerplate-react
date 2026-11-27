import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthRoute from "./components/Routing/AuthRoute";

import PublicLayout from "./components/Layouts/PublicLayout/PublicLayout";
import DashboardLayout from "./components/Dashboard/DashboardLayout/DashboardLayout";

import Home from "./pages/HomePage/Home";
import About from "./pages/AboutPage/About";
import Features from "./pages/FeaturesPage/Features";
import Pricing from "./pages/PricingPage/Pricing";
import Contact from "./pages/ContactPage/Contact";

import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Forgot from "./pages/Auth/Forgot/Forgot";
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword";
import VerifyEmail from "./pages/Auth/VerifyEmail/VerifyEmail";

import Policy from "./pages/PolicyPages/Policy";

import Overview from "./pages/Dashboard/Overview/Overview";
import Profile from "./pages/Dashboard/Profile/Profile";
import ChangePassword from "./pages/Dashboard/ChangePassword/ChangePassword";
import DashboardNotFound from "./pages/Dashboard/NotFound/DashboardNotFound";

import Elements from "./pages/ElementsPage/Elements";
import NotFound from "./pages/NotFoundPage/NotFound";


function App() {
  
  return (
    <BrowserRouter>
      <Routes>

        {/* Public site — Header + Footer */}
        <Route element={<PublicLayout />}>

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
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />

          {/* Policy Routes */}
          <Route path="/privacy-policy" element={<Policy title="Privacy Policy" />} />
          <Route path="/cookies-policy" element={<Policy title="Cookies Policy" />} />
          <Route path="/terms-and-conditions" element={<Policy title="Terms and Conditions" />} />

          {/* Other Routes */}
          {import.meta.env.DEV && <Route path="/elements" element={<Elements />} />}

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </Route>

        {/* Dashboard — protected, own layout */}
        <Route element={<AuthRoute requireAuth />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="profile" element={<Profile />} />
            <Route path="password" element={<ChangePassword />} />
            <Route path="*" element={<DashboardNotFound />} />
          </Route>
        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App