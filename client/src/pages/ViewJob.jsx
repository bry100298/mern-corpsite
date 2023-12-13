import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
// import {
//   FaBath,
//   FaBed,
//   FaChair,
//   FaMapMarkedAlt,
//   FaMapMarkerAlt,
//   FaParking,
//   FaShare,
// } from "react-icons/fa";
// import Contact from "../components/Contact";

// https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.

export default function ViewJob() {
  // SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  const job = {
    id: 1,
    jobTitle: "Project Manager - Web Design (Permanent Work from Home)",
    rating: "4.4",
    location: "Remote",
    type: "Full-time",
    description:
      "We are looking for a project manager who can manage web design projects for our clients. You will be responsible for planning, executing, and delivering high-quality web design solutions that meet the client's expectations and budget. You will also work closely with our web designers and developers to ensure the smooth and efficient implementation of the projects.",
    posted: "2 days ago",
  };

  return (
    <div className="bg-gray-100 py-12">

      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-blue-600 rounded-md p-4 mb-4 flex items-center justify-between">
            {/* <h1 className="text-2xl font-bold text-white">{job.jobTitle}</h1> */}
            <h1 className="text-2xl font-bold text-white">{listing.pname} (Permanent Work from Home)</h1>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100">
              Apply now
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white shadow-md rounded-md p-4">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                Profile insights
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                You'll need these skills for this job:
              </p>
              <ul className="list-disc list-inside pl-4 text-sm text-gray-800">
                <li>Project management</li>
                <li>Web design</li>
                <li>Graphic design</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                Do you have these skills?
              </p>
              <div className="flex items-center space-x-4 mt-2">
                <button className="bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700">
                  Yes
                </button>
                <button className="bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700">
                  No
                </button>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-md p-4">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                Job details
              </h2>
              <p className="text-sm text-gray-800 mb-4">
                {/* As a Project Manager - Web Design, you'll: */}
                {listing.biodescr}
              </p>
              <p className="text-sm text-gray-800 mb-4">
                {/* As a Project Manager - Web Design, you'll: */}
                As a {listing.pname}, you'll:
              </p>
              <ul className="list-disc list-inside pl-4 text-sm text-gray-800">
                <li>Manage web design projects</li>
                <li>Work with clients to understand their needs</li>
                <li>Coordinate with web designers and developers</li>
                <li>Ensure quality and timely delivery of projects</li>
              </ul>
              <p className="text-sm text-gray-800 mt-4">
                You'll also need to have:
              </p>
              <ul className="list-disc list-inside pl-4 text-sm text-gray-800">
                <li>
                  Bachelor's degree in web design, computer science, or related
                  field
                </li>
                <li>
                  At least 3 years of experience in web design or project
                  management
                </li>
                <li>Excellent communication and organizational skills</li>
                <li>Knowledge of web design tools and frameworks</li>
              </ul>
            </div>
          </div>
          <div className="flex items-center mt-4 space-x-4">
            <div className="flex items-center space-x-2">
              <FaStar className="text-yellow-500" />
              <span className="text-sm text-gray-600">{job.rating}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-gray-600" />
              <span className="text-sm text-gray-600">{job.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaClock className="text-gray-600" />
              {/* <span className="text-sm text-gray-600">{job.type}</span> */}
              <span className="text-sm text-gray-600">
                {listing.committment}
              </span>
            </div>
          </div>
        </div>
      )}
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </div>
  );
}
