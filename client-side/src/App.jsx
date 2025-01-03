import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import About from "./pages/about";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Headers from "./components/Headers";

const App = () => {
  return (
    <BrowserRouter>
      <Headers />
      {/* we need to add outside routes and inside browserRouter to make it available in all routes */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/projects" element={<Projects />}></Route>
        {/* <Route path="*" element={<NotFound/>}></Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
