import React from "react";
import plmunlogo from "../assets/plmun-logo.png";
import { FaSearch, FaEnvelope, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";

import {
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

// Modal Component
const Modal = ({ onClose, children }) => {
  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="bg-white p-6 rounded-md shadow-md max-w-md w-full relative"
        onClick={closeModal}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

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
  const allowedAdminEmail = "jamestin100298@gmail.com";

  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    // <header className="bg-slate-200 shadow-md">
    <header className="bg-blue-400 shadow-md">
      <div className="bg-blue-800 flex justify-between items-center max-w-8xl mx-auto p-3 h-8">
        <form className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="bg-white border-2 border-gray-300 focus:outline-none focus:border-blue-500 rounded-full py-1 px-3 w-full h-7"
          />
          <button type="submit" className="absolute right-0 top-0 mt-2 mr-3">
            <FaSearch className="text-gray-600" />
          </button>
        </form>

        <ul className="flex items-center space-x-4 text-white">
          {/* <li className="hidden sm:block">
            <a href="#" className="text-warning">
              Contact 1
            </a>
          </li> */}
          <li className="hidden sm:flex items-center">
            <a href="#" className="text-warning flex items-center">
              <FaEnvelope className="mr-1" />
              <span className="bg-yellow-400 p-1 rounded-lg">
                plmuncomm@plmun.edu.ph
              </span>
            </a>
          </li>
          <li className="hidden sm:flex items-center">
            <a href="#" className="text-warning flex items-center">
              <FaPhone className="mr-1" />
              <span className="bg-yellow-400 p-1 rounded-lg">
                02-88933368 loc 250
              </span>
            </a>
          </li>
        </ul>
      </div>
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

        <div className="md:hidden">
          <button
            onClick={toggleModal}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        {modalOpen && (
          <Modal onClose={toggleModal}>
            <ul className="text-black text-center">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/careers">Careers</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              {!currentUser && (
              <li>
                <a href="/sign-in">Login</a>
              </li>
              )}
            </ul>
          </Modal>
        )}
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
                  {currentUser.email === "jamestin100298@gmail.com" && (
                    // Display admin link and specific functionalities only for this email
                    <li className="block px-4 py-2 text-gray-800 hover:bg-blue-200">
                      <Link to="/admin" onClick={closeDropdown}>
                        Admin
                      </Link>
                    </li>
                    // Other admin-specific links can be added here
                  )}

                  <li className="block px-4 py-2 text-gray-800 hover:bg-blue-200">
                    <Link to="/profile" onClick={closeDropdown}>
                      Edit Profile
                    </Link>
                  </li>
                  <li className="block px-4 py-2 text-gray-800 hover:bg-blue-200">
                    <Link to="/create-job" onClick={closeDropdown}>
                      Create Job
                    </Link>
                  </li>
                  <li className="block px-4 py-2 text-gray-800 hover:bg-blue-200">
                    <Link to="/my-list" onClick={closeDropdown}>
                      My List
                    </Link>
                  </li>
                  <li className="block px-4 py-2 text-gray-800 hover:bg-blue-200">
                    <Link to="/profile" onClick={closeDropdown}>
                      <button onClick={handleSignOut}>Logout</button>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <Link to="/sign-in">
              <li className="relative">
                <span className="hidden sm:inline text-slate-700 hover:text-white hover:bg-blue-600 px-3 py-1 rounded-md transition duration-300 font-semibold">
                  Login
                </span>
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
