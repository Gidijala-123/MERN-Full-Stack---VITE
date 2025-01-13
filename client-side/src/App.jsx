import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import PrivateRoutes from "./components/PrivateRoutes";
import Headers from "./components/Headers";
import FooterComponent from "./components/Footer";

function App() {
  return (
    <Router>
      <Headers />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <FooterComponent />
    </Router>
  );
}

export default App;
