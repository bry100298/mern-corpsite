import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import plmunLogoCarousel from "../assets/plmunLogoCarousel.png";
import citicsLogoCarousel from "../assets/citcs-logo.png";
import cbaLogoCarousel from "../assets/CBA-logo.png";
import ccjLogoCarousel from "../assets/CCJ-logo.png";
import cteLogoCarousel from "../assets/CTE-logo.png";
import casLogoCarousel from "../assets/CAS-logo.png";
import gsLogoCarousel from "../assets/GS-logo.png";
import ippgLogoCarousel from "../assets/ippg.png";
import coaLogoCarousel from "../assets/coa.png";
import comLogoCarousel from "../assets/com.png";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
// import OAuth from "../components/OAuth";

export default function SignIn() {
  useEffect(() => {
    const interval = setInterval(() => {}, 3000);

    return () => clearInterval(interval);
  }, []);

  const [formData, setFormData] = useState({});
  //   const [error, setError] = useState(null);
  //   const [loading, setLoading] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //   setLoading(true);
      dispatch(signInStart());
      // const res = await fetch("/api/auth/signup", formData);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      if (data.success == false) {
        // setLoading(false);
        // setError(data.message);
        dispatch(signInFailure(data.message));
        return;
      }
      //   setLoading(false);
      //   setError(null);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      //   setLoading(false);
      //   setError(error.message);
      dispatch(signInFailure(data.message));
    }
  };

  return (
    <div className="p-3 flex flex-col md:flex-row max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-5">
      <div className="w-full md:w-1/2 pr-4 order-1 md:order-1">
        <Carousel showThumbs={false} infiniteLoop autoPlay>
          <div>
            <img src={plmunLogoCarousel} alt="Image 1" />
          </div>
          <div>
            <img src={citicsLogoCarousel} alt="Image 2" />
          </div>
          <div>
            <img src={cbaLogoCarousel} alt="Image 2" />
          </div>
          <div>
            <img src={ccjLogoCarousel} alt="Image 2" />
          </div>
          <div>
            <img src={cteLogoCarousel} alt="Image 2" />
          </div>
          <div>
            <img src={casLogoCarousel} alt="Image 2" />
          </div>
          <div>
            <img src={gsLogoCarousel} alt="Image 2" />
          </div>
          <div>
            <img src={ippgLogoCarousel} alt="Image 2" />
          </div>
          <div>
            <img src={coaLogoCarousel} alt="Image 2" />
          </div>
          <div>
            <img src={comLogoCarousel} alt="Image 2" />
          </div>
        </Carousel>
      </div>
      <div className="w-full md:w-1/2 pl-4 order-2 md:order-2">
        <div className="p-3 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl text-center font-semibold my-7 text-gray-800">
            Sign In
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* <div className="relative">
              <input
                type="text"
                placeholder="Username"
                className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="username"
                onChange={handleChange}
              />
            </div> */}
            <div className="relative">
              <input
                type="text"
                placeholder="Email"
                className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="password"
                onChange={handleChange}
              />
            </div>
            <button
              disabled={loading}
              className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:bg-blue-600 disabled:opacity-80"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
          <div className="flex justify-center items-center mt-5 text-gray-700">
            <p>Don&#39;t have an account?</p>
            <Link to={"/sign-up"} className="ml-2 text-blue-500">
              <span className="text-blue-700">Sign Up</span>
            </Link>
          </div>
          {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
      </div>
    </div>
  );
}
