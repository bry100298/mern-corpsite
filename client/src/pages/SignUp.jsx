import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import plmunLogoCarousel from "../assets/plmunLogoCarousel.png";
// import citicsLogoCarousel from "../assets/citcs-logo.png";
// import cbaLogoCarousel from "../assets/CBA-logo.png";
// import ccjLogoCarousel from "../assets/CCJ-logo.png";
// import cteLogoCarousel from "../assets/CTE-logo.png";
// import casLogoCarousel from "../assets/CAS-logo.png";
// import gsLogoCarousel from "../assets/GS-logo.png";
// import ippgLogoCarousel from "../assets/ippg.png";
// import coaLogoCarousel from "../assets/coa.png";
// import comLogoCarousel from "../assets/com.png";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import OAuth from "../components/OAuth";

import "./Home.css";

export default function SignUp() {
  useEffect(() => {
    const interval = setInterval(() => {}, 3000);

    return () => clearInterval(interval);
  }, []);

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // const res = await fetch("/api/auth/signup", formData);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      if (data.success == false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  // console.log(formData);

  return (
    // <div className="p-3 max-w-lg mx-auto">
    //   <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
    //   <form className="flex flex-col gap-4">
    //     <input
    //       type="text"
    //       placeholder="username"
    //       className="border p-3 rounded-lg"
    //       id="username"
    //     />

    //     <input
    //       type="text"
    //       placeholder="email"
    //       className="border p-3 rounded-lg"
    //       id="email"
    //     />

    //     <input
    //       type="password"
    //       placeholder="password"
    //       className="border p-3 rounded-lg"
    //       id="password"
    //     />
    //     <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
    //       Sign Up
    //     </button>
    //   </form>
    //   <div className="flex gap-2 mt-5">
    //     <p>Have an account?</p>
    //     <Link to={"/sign-in"}>
    //       <span className="text-blue-700">Sign in</span>
    //     </Link>
    //   </div>
    // </div>

    // <div className="p-3 max-w-lg mx-auto bg-white shadow-lg rounded-lg mt-5">
    // <div className="p-3 flex max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-5">

    <div className="home-bg">
      <div className="content">
        <div className="p-3 flex flex-col md:flex-row max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-5">
          {/* <div className="w-1/2 pr-4"> */}
          <div className="w-full md:full pr-4 order-1 md:order-1">
            <Carousel showThumbs={false} infiniteLoop autoPlay>
              <div>
                {/* <img src={plmunLogoCarousel} alt="Image 1" /> */}
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/mern-corpsite.appspot.com/o/plmunLogoCarousel.png?alt=media&token=bfb941e5-d35f-4d28-8324-0debb4be0dd3"
                  alt="Image 1"
                />
              </div>
              <div>
                {/* <img src={citicsLogoCarousel} alt="Image 2" /> */}
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/mern-corpsite.appspot.com/o/citcs-logo.png?alt=media&token=0807fa4f-ca33-4c7c-9027-78c9dca555d1"
                  alt="Image 2"
                />
              </div>
              <div>
                {/* <img src={cbaLogoCarousel} alt="Image 2" /> */}
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/mern-corpsite.appspot.com/o/CBA-logo.png?alt=media&token=e488121c-bf52-42a6-ad58-27357ad611be"
                  alt="Image 2"
                />
              </div>
              <div>
                {/* <img src={ccjLogoCarousel} alt="Image 2" /> */}
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/mern-corpsite.appspot.com/o/CCJ-logo.png?alt=media&token=28afb086-9e0f-49bc-8a11-85e3e3a49d1a"
                  alt="Image 2"
                />
              </div>
              <div>
                {/* <img src={cteLogoCarousel} alt="Image 2" /> */}
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/mern-corpsite.appspot.com/o/CTE-logo.png?alt=media&token=dd4f293a-01f6-446f-900b-b2261b23b091"
                  alt="Image 2"
                />
              </div>
              <div>
                {/* <img src={casLogoCarousel} alt="Image 2" /> */}
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/mern-corpsite.appspot.com/o/CAS-logo.png?alt=media&token=66ee1a93-78fa-4b46-89b3-47620ea37620"
                  alt="Image 2"
                />
              </div>
              <div>
                {/* <img src={gsLogoCarousel} alt="Image 2" /> */}
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/mern-corpsite.appspot.com/o/GS-logo.png?alt=media&token=833f3c44-9a23-4412-bcef-f5968a2425ec"
                  alt="Image 2"
                />
              </div>
              <div>
                {/* <img src={ippgLogoCarousel} alt="Image 2" /> */}
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/mern-corpsite.appspot.com/o/ippg.png?alt=media&token=9a698239-ab7e-449c-9c1f-cde86e6c16df"
                  alt="Image 2"
                />
              </div>
              <div>
                {/* <img src={coaLogoCarousel} alt="Image 2" /> */}
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/mern-corpsite.appspot.com/o/coa.png?alt=media&token=4ae988cb-4651-4041-8211-fbeed4e53d3c"
                  alt="Image 2"
                />
              </div>
              <div>
                {/* <img src={comLogoCarousel} alt="Image 2" /> */}
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/mern-corpsite.appspot.com/o/com.png?alt=media&token=2b891864-d11d-4b7c-96b6-091e0ff71ad2"
                  alt="Image 2"
                />
              </div>
            </Carousel>
          </div>
          {/* <div className="w-1/2 pl-4"> */}
          <div className="w-full md:w-full pl-4 order-2 md:order-2">
            <div className="p-3 bg-white shadow-lg rounded-lg">
              <h1 className="text-3xl text-center font-semibold my-7 text-gray-800">
                Create an Account
              </h1>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Username"
                    className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="username"
                    onChange={handleChange}
                  />
                </div>

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
                  className="bg-blue-500 text-white p-3 rounded-lg uppercase hover:bg-blue-600 disabled:opacity-80"
                >
                  {loading ? "Loading..." : "Create Account"}
                </button>
                <OAuth />
              </form>
              <div className="flex justify-center items-center mt-5 text-gray-700">
                <p>Already have an account?</p>
                <Link to={"/sign-in"} className="ml-2 text-blue-500">
                  {/* Sign in */}
                  <span className="text-blue-700">Sign in</span>
                </Link>
              </div>
              {error && <p className="text-red-500 mt-5">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
