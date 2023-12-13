import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function UserList() {
  const itemsPerPageOptions = [5, 10, 15];
  const [showUsersDashboard, setShowUsersDashboard] = useState(false);

  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPageUsers, setCurrentPageUsers] = useState(1);

  const [displayedUsers, setDisplayedUsers] = useState([]);

  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    const calculateDisplayedUsers = () => {
      const startIndex = (currentPageUsers - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const usersToDisplay = userListings.slice(startIndex, endIndex);
      setDisplayedUsers(usersToDisplay);
      // setUserListings(usersToDisplay);
    };

    if (showUsersDashboard) {
      calculateDisplayedUsers();
    }
  }, [currentPageUsers, itemsPerPage, showUsersDashboard, userListings]);

  const totalUsersPages = Math.ceil(userListings.length / itemsPerPage);

  // Functions for pagination
  const paginateUsers = (pageNumber) => {
    setCurrentPageUsers(pageNumber);
  };

  // LISTING FOR USER
  const handleShowListings = async () => {
    try {
      setShowUsersDashboard(true);

      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-gray-100 h-screen">
      <div className="flex h-full">
        {/* Sidebar */}
        <aside className="w-1/4 bg-gray-900 text-gray-200">
          {/* Brand Logo */}
          <a href="#" className="brand-link text-center block py-4">
            <span className="brand-text font-semibold text-lg">
              CareerLink Admin Hub
            </span>
          </a>

          {/* Sidebar content */}
          <nav className="py-4">
            <ul className="nav flex flex-col">
              <li className="nav-item">
                {/* <a href="#" className="nav-link py-2 pl-4 hover:text-white"> */}
                <button
                  // href="#"
                  onClick={handleShowListings}
                  className="w-full py-2 transition-all  hover:text-white hover:bg-blue-600 hover:pl-8 hover:max-w-full"
                  // className="nav-link py-2 pl-4 transition-all hover:text-white hover:bg-blue-600 hover:pl-8 hover:max-w-full"
                >
                  My Job List
                </button>
                <p className="text-red-700 mt-5">
                  {showListingsError ? "Error showing listings" : ""}
                </p>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <div className="w-3/4 p-8 overflow-y-auto">
          {showUsersDashboard && (
            <div>
              {/* <h1 className="text-2xl font-bold mb-8">Users Dashboard</h1> */}
              <h1 className="text-2xl font-bold mb-8">Job Listings Board</h1>
              <div className="bg-white p-4 rounded shadow">
                {/* User Listings */}
                {userListings && userListings.length > 0 && (
                  <div>
                    <h1 className="text-center mt-7 text-2xl font-semibold">
                      {/* Job Listings */}
                    </h1>
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100 border-b">
                          <th className="text-left px-4 py-2">Company Name</th>
                          <th className="text-left px-4 py-2">Company Email</th>
                          <th className="text-left px-4 py-2">Company Logo</th>
                          <th className="text-left px-4 py-2">Position Name</th>
                          <th className="text-left px-4 py-2">Role</th>
                          <th className="text-left px-4 py-2">Committment</th>
                          <th className="text-left px-4 py-2">Salary</th>
                          <th className="text-left px-4 py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {userListings.map((listing) => ( */}
                        {displayedUsers.map((listing) => (
                          <tr
                            key={listing._id}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="px-4 py-2">
                              {/* {listing.cname} */}
                              <Link
                                className="text-slate-700 font-semibold hover:underline truncate flex-1"
                                to={`/listing/${listing._id}`}
                              >
                                <p>{listing.cname}</p>
                              </Link>
                            </td>
                            <td className="px-4 py-2">{listing.cemail}</td>
                            <td className="px-4 py-2">
                              <div className="flex items-center gap-4">
                                <Link to={`/listing/${listing._id}`}>
                                  <img
                                    src={listing.clogo[0]}
                                    alt="listing cover"
                                    className="h-16 w-16 object-contain"
                                  />
                                </Link>
                                {/* <Link
                                  className="text-slate-700 font-semibold hover:underline truncate flex-1"
                                  to={`/listing/${listing._id}`}
                                >
                                  <p>{listing.cname}</p>
                                </Link> */}
                              </div>
                            </td>
                            <td className="px-4 py-2">{listing.pname}</td>
                            <td className="px-4 py-2">{listing.role}</td>
                            <td className="px-4 py-2">{listing.committment}</td>
                            <td className="px-4 py-2">{listing.salary}</td>

                            <td className="px-4 py-2">
                              <div className="flex flex-col items-center">
                                <button
                                  onClick={() =>
                                    handleListingDelete(listing._id)
                                  }
                                  className="text-red-700 uppercase bg-red-200 rounded-md px-4 py-1 mt-2 hover:bg-red-300"
                                >
                                  Delete
                                </button>
                                <Link to={`/update-joblist/${listing._id}`}>
                                  <button className="text-green-700 uppercase uppercase bg-green-200 rounded-md px-4 py-1 mt-2 hover:bg-green-300">
                                    Edit
                                  </button>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Pagination */}
                <div className="flex justify-end">
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
                    Page {currentPageUsers} of {totalUsersPages}
                  </span>
                  <button
                    onClick={() => paginateUsers(currentPageUsers - 1)}
                    disabled={currentPageUsers === 1}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => paginateUsers(currentPageUsers + 1)}
                    disabled={currentPageUsers === totalUsersPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="bg-gray-800 text-white text-center py-4">
        <div className="float-right d-none d-sm-inline">MIT 2-A</div>
        <strong>
          &copy;Developed by <a href="#">James Bryant Tin MIT504 2023</a>.
        </strong>{" "}
        All rights reserved.
      </footer>
    </div>
  );
}
