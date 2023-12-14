import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const itemsPerPageOptions = [4, 8, 12];

export default function Search() {
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
  //
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/listing/get");
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        setListings(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  // Calculate the indexes of items to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listings.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalListingsPages = Math.ceil(listings.length / itemsPerPage);

  const paginateListings = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //   const jobs = [
  //     {
  //       title: "Web Developer",
  //       company: "Speech Improvement Center",
  //       location: "Manila",
  //       salary: "PHP 25,000 - PHP 44,000 a month",
  //       type: "Full-time",
  //       tags: ["Easy apply", "Urgently hiring"],
  //       skills: ["WordPress (required)", "CSS"],
  //       details:
  //         "Creating dynamic & user friendly website. Regular website maintenance and security updates. Minimum 4 years of experience with WordPress.",
  //       posted: "1 day ago",
  //     },
  //     {
  //       title: "Wordpress Web Developer (Entry Level)",
  //       company: "Stone Refo",
  //       location: "Manila",
  //       salary: "PHP 30,000 a month",
  //       type: "Full-time",
  //       tags: ["Easy apply", "Urgently hiring"],
  //       skills: ["Demonstrable graphic design skills with strong portfolio"],
  //       details: "Remote & Flexible Schedule. Monday to Friday.",
  //       posted: "Three weeks ago",
  //     },
  //     {
  //       title: "Wordpress Web Developer (Entry Level)",
  //       company: "Stone Refo",
  //       location: "Manila",
  //       salary: "PHP 30,000 a month",
  //       type: "Full-time",
  //       tags: ["Easy apply", "Urgently hiring"],
  //       skills: ["Demonstrable graphic design skills with strong portfolio"],
  //       details: "Remote & Flexible Schedule. Monday to Friday.",
  //       posted: "Three weeks ago",
  //     },
  //     {
  //       title: "Wordpress Web Developer (Entry Level)",
  //       company: "Stone Refo",
  //       location: "Manila",
  //       salary: "PHP 30,000 a month",
  //       type: "Full-time",
  //       tags: ["Easy apply", "Urgently hiring"],
  //       skills: ["Demonstrable graphic design skills with strong portfolio"],
  //       details: "Remote & Flexible Schedule. Monday to Friday.",
  //       posted: "Three weeks ago",
  //     },
  //     {
  //       title: "Wordpress Web Developer (Entry Level)",
  //       company: "Stone Refo",
  //       location: "Manila",
  //       salary: "PHP 30,000 a month",
  //       type: "Full-time",
  //       tags: ["Easy apply", "Urgently hiring"],
  //       skills: ["Demonstrable graphic design skills with strong portfolio"],
  //       details: "Remote & Flexible Schedule. Monday to Friday.",
  //       posted: "Three weeks ago",
  //     },
  //   ];

  const JobCard = ({ job }) => (
    <div
      className="bg-white shadow-md rounded-md p-4 mb-4"
      onClick={() => handleShowDetails(job)}
    >
      <h3 className="text-lg font-bold">{job.pname}</h3>
      <p className="text-gray-600">{job.cname}</p>
      <p className="text-gray-600">{job.location}</p>
      <p className="text-gray-600">{job.salary}</p>
      <p className="text-gray-600">{job.committment}</p>
      <div className="flex space-x-2 mt-2">
        {job.tags &&
          job.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-600 px-2 py-1 rounded-sm text-sm"
            >
              {tag}
            </span>
          ))}
      </div>
    </div>
  );

  // Define a custom component for rendering the expanded view of a job
  const JobDetails = ({ job }) => (
    <div className="bg-white shadow-md rounded-md p-4">
      <h3 className="text-lg font-bold">{job.pname}</h3>
      <p className="text-gray-600">{job.cname}</p>
      <p className="text-gray-600">{job.location}</p>
      <p className="text-gray-600">{job.salary}</p>
      <p className="text-gray-600">{job.committment}</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4">
        {/* Apply now */}
        <Link to={`/viewjob/${job._id}`}>Apply Now</Link>
      </button>
      <div className="mt-4">
        <h4 className="text-lg font-bold">Profile insights</h4>
        <p className="text-gray-600">
          Here's how this job's qualifications align with your profile:
        </p>
        <ul className="list-disc list-inside">
          {job.skills &&
            job.skills.map((skill, index) => (
              <li key={index} className="text-gray-600">
                {skill}
              </li>
            ))}
        </ul>
      </div>
      <div className="mt-4">
        <h4 className="text-lg font-bold">Job details</h4>
        <p className="text-gray-600">
          Here's how this job's details align with your preferences:
        </p>
        <ul className="list-disc list-inside">
          <li className="text-gray-600">Pay: {job.salary}</li>
          <li className="text-gray-600">Job type: {job.committment}</li>
          {/* Add other details as needed */}
        </ul>
      </div>
    </div>
  );

  // Define a state for displaying job details
  const [selectedJob, setSelectedJob] = useState(null);

  // Function to handle displaying job details
  const handleShowDetails = (job) => {
    setSelectedJob(job);
  };

  return (
    <div className=" bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">developer</h1>
          <div className="flex space-x-4">
            <select className="border-gray-300 rounded-md">
              <option>Date posted</option>
            </select>
            <select className="border-gray-300 rounded-md">
              <option>Remote</option>
            </select>
            <select className="border-gray-300 rounded-md">
              <option>Within 25 miles</option>
            </select>
            <select className="border-gray-300 rounded-md">
              <option>Job type</option>
            </select>
            <select className="border-gray-300 rounded-md">
              <option>Location</option>
            </select>
            <select className="border-gray-300 rounded-md">
              <option>Company</option>
            </select>
            <select className="border-gray-300 rounded-md">
              <option>Job Language</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="col-span-2">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error fetching data</p>
            ) : (
              currentItems.map((listing, index) => (
                <JobCard key={index} job={listing} />
              ))
            )}
            {/* {listings.map((listing, index) => (
              // {jobs.map((job) => (
              //   <JobCard job={job} />
              <JobCard key={index} job={listing} />
            ))} */}
          </div>

          <div className="col-span-1">
            {/* <JobDetails job={jobs[0]} /> */}
            {/* <JobDetails job={listings[0]} /> */}
            {/* {listings.length > 0 && <JobDetails job={listings[0]} />} */}
            {selectedJob && <JobDetails job={selectedJob} />}
          </div>
        </div>

        {/* Pagination logic */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalListingsPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginateListings(index + 1)}
              className={`mx-1 px-3 py-1 rounded-md ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
