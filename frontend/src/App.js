// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import Events from "./pages/Events/Events";
import Contact from "./pages/Contact/Contact";
import Inquiry from "./pages/Inquiry/Inquiry";
import Payments from "./pages/Payments/Payments";

const Layout = (
  
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/events" element={<Events />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/inquiry" element={<Inquiry />} />
    <Route path="/payments" element={<Payments />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/login" element={<LoginPage />} />
  </Routes>
);

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element ={<HomePage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
