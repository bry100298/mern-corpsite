import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/Signin";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Careers from "./pages/Careers";
import CreateJob from "./pages/CreateJob";

import Header from "./components/Header";

import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter className="text-red-600">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/careers" element={<Careers />} />
        <Route path="/create-job" element={<CreateJob />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
