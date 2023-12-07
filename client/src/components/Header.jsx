import React from "react";
import plmunlogo from "../assets/plmun-logo.png";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";

import {
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
export default function Header() {
  // const { currentUser } = useSelector((state) => state.user);

  // const [showDropdown, setShowDropdown] = useState(false);

  // const toggleDropdown = () => {
  //   setShowDropdown(!showDropdown);
  // };

  // const closeDropdown = () => {
  //   setShowDropdown(false);
  // };

  const { currentUser } = useSelector((state) => state.user);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    if (showDropdown) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [showDropdown]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  return (
    // <header className="bg-slate-200 shadow-md">
    <header className="bg-blue-400 shadow-md">
      {/* <div className="flex justify-between items-center max-w-6xl mx-auto"> */}
      <div className="flex justify-between items-center max-w-8xl mx-auto p-3">
        <div className="flex items-center">
          <Link to="/">
            {/* <img src={plmunlogo} alt="PLMUN Logo" className="w-50 h-50 mr-2" />{" "} */}
            <img
              src={plmunlogo}
              alt="PLMUN Logo"
              className="h-14 max-w-[200px] w-auto mr-2"
            />{" "}
          </Link>
          <form className="bg-slate-100 p-3 rounded-lg flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-24 sm:w-64 md:w-96"
            />
            {/* <FaSearch className="text-slate-500" /> */}
            <FaSearch className="text-slate-700" />
          </form>
          {/* Use the image */}
          {/* <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">PLMUN</span>
            <span className="text-slate-700">Job Posting</span>
          </h1> */}
        </div>
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          {/* <span className="text-slate-500">PLMUN</span>
          <span className="text-slate-700">Job Posting</span> */}
          {/* <span className="text-yellow-//#endregion">PLMUN</span> */}
          {/* <span className="text-yellow-950">Job Posting</span> */}
        </h1>
        {/* <form
          action=""
          className="bg-slate-100 p-3 rounded-lg flex items-center"
        > */}

        <ul className="flex gap-4">
          <Link to="/">
            {/* <li className="hidden sm:inline text-slate-700 hover:underline"> */}
            <li className="hidden sm:inline text-slate-700 hover:text-white hover:bg-blue-600 px-3 py-1 rounded-md transition duration-300 font-semibold">
              Home
            </li>
          </Link>

          <Link to="/careers">
            {/* <li className="hidden sm:inline text-slate-700 hover:underline"> */}
            <li className="hidden sm:inline text-slate-700 hover:text-white hover:bg-blue-600 px-3 py-1 rounded-md transition duration-300 font-semibold">
              Careers
            </li>
          </Link>

          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:text-white hover:bg-blue-600 px-3 py-1 rounded-md transition duration-300 font-semibold">
              About
            </li>
          </Link>
          {/* 
          <Link to="/profile">
            {currentUser ? (
              <img
                // className="rounded-full h-7 w-7 object-cover"
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
                style={{ minWidth: "28px", minHeight: "28px" }}
              />
            ) : (
              // <li className="sm:inline text-slate-700 hover:underline">
              // <li className=" text-slate-700 hover:underline">SignIn</li>
              <li className="hidden sm:inline text-slate-700 hover:text-white hover:bg-blue-600 px-3 py-1 rounded-md transition duration-300 font-semibold">
                SignIn
              </li>
            )}
          </Link> */}

          {currentUser ? (
            <li className="relative" ref={dropdownRef}>
              <div onClick={toggleDropdown}>
                <img
                  className="rounded-full h-7 w-7 object-cover cursor-pointer"
                  src={currentUser.avatar}
                  alt="profile"
                  style={{ minWidth: "28px", minHeight: "28px" }}
                />
              </div>
              {showDropdown && (
                <ul className="absolute bg-white shadow-md rounded-md mt-8 py-2 w-36 right-0 z-20">
                  <li className="block px-4 py-2 text-gray-800 hover:bg-blue-200">
                    <Link to="/profile" onClick={closeDropdown}>
                      Edit Profile
                    </Link>
                  </li>
                  <li className="block px-4 py-2 text-gray-800 hover:bg-blue-200">
                    <Link to="/profile" onClick={closeDropdown}>
                      <button onClick={handleSignOut}>Sign Out</button>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <Link to="/sign-in">
              <li className="relative">
                <span className="hidden sm:inline text-slate-700 hover:text-white hover:bg-blue-600 px-3 py-1 rounded-md transition duration-300 font-semibold">
                  SignIn
                </span>
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
