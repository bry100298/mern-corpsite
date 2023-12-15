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

  //   MODAL
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust this threshold as needed
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
  const JobDetails = ({ job, onClose }) => (
    <>
      {/* Modal for mobile devices */}
      {selectedJob && isMobile && showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white shadow-md rounded-md p-4 w-full max-w-md relative">
            <div className="bg-white shadow-md rounded-md p-4 max-h-[80vh] overflow-y-auto">
              {/* Job details content for modal */}
              <div className="sticky top-0 bg-white shadow-md rounded-md p-4 mb-4">
                <h3 className="text-lg font-bold">{job.pname}</h3>
                <p className="text-gray-600">{job.cname}</p>
                <p className="text-gray-600">{job.location}</p>
                <p className="text-gray-600">{job.salary}</p>
                <p className="text-gray-600">{job.committment}</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4">
                  {/* Apply now */}
                  <Link to={`/viewjob/${job._id}`}>Apply Now</Link>
                </button>
              </div>
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
              {/* Close button */}
              {selectedJob && (
                <button
                  onClick={onClose}
                  className="bg-red-600 text-white px-4 py-2 rounded-md mt-4"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Job details for non-mobile devices */}
      {!isMobile && selectedJob && (
        <div className="bg-white shadow-md rounded-md p-4 max-h-[80vh] overflow-y-auto">
          <div className="sticky top-0 bg-white shadow-md rounded-md p-4 mb-4">
            <h3 className="text-lg font-bold">{job.pname}</h3>
            <p className="text-gray-600">{job.cname}</p>
            <p className="text-gray-600">{job.location}</p>
            <p className="text-gray-600">{job.salary}</p>
            <p className="text-gray-600">{job.committment}</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4">
              {/* Apply now */}
              <Link to={`/viewjob/${job._id}`}>Apply Now</Link>
            </button>
          </div>
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
      )}
    </>
  );

  // Define a state for displaying job details
  const [selectedJob, setSelectedJob] = useState(null);

  // Function to handle displaying job details
  const handleShowDetails = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* <div className="flex items-center justify-between"> */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 md:space-x-4">
          {/* <h1 className="text-3xl font-bold">developer</h1> */}
          <h1 className="text-3xl font-bold md:order-1">developer</h1>
          {/* <div className="flex space-x-4"> */}
          {/* <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"> */}
          <div className="flex flex-wrap space-x-4 w-full md:w-auto md:order-2">
            <div className="flex items-center gap-2">
              <select className="border rounded-lg p-3">
                {/* <select className="border-gray-300 rounded-md"> */}
                <option>Date posted</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <select className="border rounded-lg p-3">
                {/* <select className="border-gray-300 rounded-md"> */}
                <option value="">Work Setup</option>
                <option value="Onsite">Onsite</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            {/* <select className="border-gray-300 rounded-md">
              <option>Within 25 miles</option>
            </select> */}
            <div className="flex items-center gap-2">
              <select className="border rounded-lg p-3">
                {/* <select className="border-gray-300 rounded-md"> */}
                <option>Job type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <select className="border rounded-lg p-3">
                {/* <select className="border-gray-300 rounded-md"> */}
                <option>Location</option>
                <option value="Manila">Manila</option>
                <option value="Makati">Makati</option>
                <option value="Taguig">Taguig</option>
              </select>
            </div>
            {/* <select className="border-gray-300 rounded-md">
              <option>Sort by:</option>
              <option value="Latest">Latest</option>
              <option value="Oldest">Oldest</option>
            </select> */}
            <div className="flex items-center gap-2">
              <label className="font-semibold">Sort:</label>
              <select id="sort_order" className="border rounded-lg p-3">
                <option>Latest post</option>
                <option>Oldest post</option>
              </select>
            </div>
            {/* <div className="bg-blue-800 flex justify-between items-center max-w-8xl mx-auto p-3 h-8"> */}
            <form className="relative w-full max-w-md">
              {/* <input
                type="text"
                placeholder="Search..."
                className="bg-white border-2 border-gray-300 focus:outline-none focus:border-blue-500 rounded-full py-1 px-3 w-full h-7"
              /> */}
              <button className="bg-gray-700 hover:bg-gray-900 text-white font-bold focus:outline-none focus:shadow-outline rounded-full py-1 px-3 w-full h-10">
                Find Jobs
              </button>
              {/* <button
                type="submit"
                className="absolute right-0 top-0 mt-2 mr-3"
              >
                <FaSearch className="text-gray-600" />
              </button> */}
            </form>
            {/* </div> */}

            {/* <select className="border-gray-300 rounded-md">
              <option>Company</option>
            </select> */}
            {/* <select className="border-gray-300 rounded-md">
              <option>Job Language</option>
            </select> */}
          </div>
        </div>
        {/* <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="col-span-2"> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <div className="col-span-1 md:col-span-2">
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
        {/* Mobile Modal for Job Details */}
        {/* {selectedJob && showModal && ( */}
        {selectedJob && isMobile && showModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white shadow-md rounded-md p-4 w-full max-w-md relative">
              {/* Job details content for modal */}
              <JobDetails job={selectedJob} onClose={handleCloseModal} />
              {/* <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                Close
              </button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
