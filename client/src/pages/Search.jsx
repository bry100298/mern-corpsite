import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const itemsPerPageOptions = [4, 8, 12];

export default function Search() {
  // For Search
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    sort: "created_at",
    order: "desc",
  });

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
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('keyword');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      try {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
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
  }, [location.search]);

  // start search

  const handleChange = (e) => {
    if (e.target.id === "keyword") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("keyword", sidebardata.searchTerm);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  // end search

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
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 md:space-x-4">
          {/* <h1 className="text-3xl font-bold md:order-1">developer</h1> */}
          <div className="flex flex-wrap space-x-4 w-full md:w-auto md:order-2">
            <form className="relative w-full max-w-md">
              <input
                type="text"
                id="keyword"
                placeholder="Keyword..."
                className="border hover:bg-gray-100 focus:outline-none focus:shadow-outline p-3 w-full"
              />
              <button type="submit">Find Jobs</button>
            </form>
            <div className="flex items-center gap-2">
              <select className="border rounded-lg p-3">
                <option>Date posted</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <select className="border rounded-lg p-3">
                <option value="">Work Setup</option>
                <option value="Onsite">Onsite</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <select className="border rounded-lg p-3">
                <option>Job type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <select className="border rounded-lg p-3">
                <option>Location</option>
                <option value="Manila">Manila</option>
                <option value="Makati">Makati</option>
                <option value="Taguig">Taguig</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="font-semibold">Sort:</label>
              <select id="sort_order" className="border rounded-lg p-3">
                <option>Latest post</option>
                <option>Oldest post</option>
              </select>
            </div>
            <form className="relative w-full max-w-md">
              <button className="relative bg-gray-700 hover:bg-gray-900 text-white font-bold focus:outline-none focus:shadow-outline rounded-full py-1 px-3 w-full h-10">
                Find Jobs
              </button>
            </form>
          </div>
        </div>
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
          </div>

          <div className="col-span-1">
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
