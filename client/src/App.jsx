import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Careers from "./pages/Careers";
import CreateJob from "./pages/CreateJob";

import Header from "./components/Header";
import Footer from "./components/Footer";

import PrivateRoute from "./components/PrivateRoute";
import Admin from "./pages/Admin";
import UserList from "./pages/UserList";
import UpdateListing from "./pages/UpdateListing";
import ViewJob from "./pages/ViewJob";
import Search from "./pages/Search";

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
        <Route path="/viewjob/:listingId" element={<ViewJob />} />
        <Route path="/Search" element={<Search />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-job" element={<CreateJob />} />
          <Route path="/my-list" element={<UserList />} />
          <Route
            path="/update-joblist/:listingId"
            element={<UpdateListing />}
          />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
