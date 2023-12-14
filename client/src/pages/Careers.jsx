import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const itemsPerPageOptions = [4, 8, 12];

export default function Careers() {
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

  return (
    <div className="bg-gray-100 py-12">
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}

      {/* <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> */}
      <div className="max-w-12xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Join Our Team
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {currentItems.map((listing) => (
            <div
              key={listing._id}
              className="bg-white shadow-md rounded-lg p-12"
            >
              <div className="flex items-center">
                <img
                  src={listing.clogo}
                  alt={listing.cname}
                  // className="w-12 h-12 rounded-full mr-4"
                />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                <Link to={`/viewjob/${listing._id}`}>{listing.cname}</Link>
              </h2>
              {listing.biodescr && (
                <p className="text-gray-600 mb-4">
                  {truncateDescription(listing.biodescr, 300)}
                </p>
              )}
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                <Link to={`/viewjob/${listing._id}`}>Apply Now</Link>
              </button>
            </div>
          ))}
        </div>
        {/* Pagination controls */}
        <div className="flex justify-end mt-8">
          <span className="mr-4">Items per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="ml-4">
            Page {currentPage} of {totalListingsPages}
          </span>
          <button
            onClick={() => paginateListings(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={() => paginateListings(currentPage + 1)}
            disabled={currentPage === totalListingsPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
