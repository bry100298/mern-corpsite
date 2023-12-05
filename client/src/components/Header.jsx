import React from "react";
import plmunlogo from "../assets/plmun-logo.png";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    // <header className="bg-slate-200 shadow-md">
    <header className="bg-blue-400 shadow-md">
      {/* <div className="flex justify-between items-center max-w-6xl mx-auto"> */}
      <div className="flex justify-between items-center max-w-8xl mx-auto p-3">
        <div className="flex items-center">
          <Link to="./">
            <img src={plmunlogo} alt="PLMUN Logo" className="w-50 h-50 mr-2" />{" "}
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
          <span className="text-yellow-//#endregion">PLMUN</span>
          <span className="text-yellow-950">Job Posting</span>
        </h1>
        {/* <form
          action=""
          className="bg-slate-100 p-3 rounded-lg flex items-center"
        > */}
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64 md:w-96"
          />
          {/* <FaSearch className="text-slate-500" /> */}
          <FaSearch className="text-slate-700" />
        </form>
        <ul className="flex gap-4">
          <Link to="./">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>

          <Link to="./careers">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Careers
            </li>
          </Link>

          <Link to="./about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About Us
            </li>
          </Link>

          <Link to="./sign-in">
            <li className="sm:inline text-slate-700 hover:underline">SignIn</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
