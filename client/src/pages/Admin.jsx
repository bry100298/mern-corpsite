import React, { useState, useEffect } from "react";

export default function Admin() {
  const initialUsers = [
    {
      name: "Bryan Pogi asd",
      email: "bryanpogi@gmail.com",
      date: "2023-01-01",
    },
    {
      name: "Bryan Pogi",
      email: "bryanpogi@gmail.com",
      date: "2023-01-01",
    },
    {
      name: "Bryan Pogi",
      email: "bryanpogi@gmail.com",
      date: "2023-01-03",
    },
    {
      name: "Bryan Pogi",
      email: "bryanpogi@gmail.com",
      date: "2023-01-03",
    },
    {
      name: "Bryan Pogi",
      email: "bryanpogi@gmail.com",
      date: "2023-01-03",
    },
    {
      name: "Bryan Pogi",
      email: "bryanpogi@gmail.com",
      date: "2023-01-03",
    },
    {
      name: "Bryan Pogi",
      email: "bryanpogi@gmail.com",
      date: "2023-01-03",
    },
    {
      name: "Bryan Pogi",
      email: "bryanpogi@gmail.com",
      date: "2023-01-03",
    },
    {
      name: "Bryan Pogi",
      email: "bryanpogi@gmail.com",
      date: "2023-01-03",
    },
    {
      name: "Bryan Pogi",
      email: "bryanpogi@gmail.com",
      date: "2023-01-03",
    },
    {
      name: "Bryan Pogi",
      email: "bryanpogi@gmail.com",
      date: "2023-01-03",
    },
    {
      name: "Bryan Pogi",
      email: "bryanpogi@gmail.com",
      date: "2023-01-03",
    },
    {
      name: "Bryan Pogi",
      email: "bryanpogi@gmail.com",
      date: "2023-01-03",
    },
  ];

  const initialJobs = [
    {
      name: "asd Bryan Pogi",
      email: "bryanpogi@gmail.com",
      date: "2023-01-01",
    },
    {
      name: "Bryan Pogi",
      email: "bryanpogi@gmail.com",
      date: "2023-01-01",
    },
    {
      name: "Bryan Pogi",
      email: "bryanpogi@gmail.com",
      date: "2023-01-03",
    },
    {
      name: "Bryan Pogi",
      email: "bryanpogi@gmail.com",
      date: "2023-01-03",
    },
    {
      name: "Bryan Pogi",
      email: "bryanpogi@gmail.com",
      date: "2023-01-03",
    },
    {
      name: "Bryan Pogi",
      email: "bryanpogi@gmail.com",
      date: "2023-01-03",
    },
    {
      name: "Bryan Pogi",
      email: "bryanpogi@gmail.com",
      date: "2023-01-03",
    },
    {
      name: "Bryan Pogi",
      email: "bryanpogi@gmail.com",
      date: "2023-01-03",
    },
    {
      name: "Bryan Pogi",
      email: "bryanpogi@gmail.com",
      date: "2023-01-03",
    },
    {
      name: "Bryan Pogi",
      email: "bryanpogi@gmail.com",
      date: "2023-01-03",
    },
    {
      name: "Bryan Pogi",
      email: "bryanpogi@gmail.com",
      date: "2023-01-03",
    },
    {
      name: "Bryan Pogi",
      email: "bryanpogi@gmail.com",
      date: "2023-01-03",
    },
    {
      name: "Bryan Pogi",
      email: "bryanpogi@gmail.com",
      date: "2023-01-03",
    },
  ];

  const itemsPerPageOptions = [5, 10, 15];
  const [showUsersDashboard, setShowUsersDashboard] = useState(false);
  const [showJobDashboard, setShowJobDashboard] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPageUsers, setCurrentPageUsers] = useState(1);
  const [currentPageJobs, setCurrentPageJobs] = useState(1);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [displayedJobs, setDisplayedJobs] = useState([]);

  useEffect(() => {
    const calculateDisplayedUsers = () => {
      const startIndex = (currentPageUsers - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const usersToDisplay = initialUsers.slice(startIndex, endIndex);
      setDisplayedUsers(usersToDisplay);
    };

    const calculateDisplayedJobs = () => {
      const startIndex = (currentPageJobs - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const jobsToDisplay = initialJobs.slice(startIndex, endIndex);
      setDisplayedJobs(jobsToDisplay);
    };

    if (showUsersDashboard) {
      calculateDisplayedUsers();
    } else if (showJobDashboard) {
      calculateDisplayedJobs();
    }
  }, [
    currentPageUsers,
    currentPageJobs,
    itemsPerPage,
    showUsersDashboard,
    showJobDashboard,
    // initialUsers,
    // initialJobs,
  ]);

  const totalUsersPages = Math.ceil(initialUsers.length / itemsPerPage);
  const totalJobsPages = Math.ceil(initialJobs.length / itemsPerPage);

  // Functions for pagination
  const paginateUsers = (pageNumber) => {
    setCurrentPageUsers(pageNumber);
  };

  const paginateJobs = (pageNumber) => {
    setCurrentPageJobs(pageNumber);
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
                <a
                  href="#"
                  className="nav-link py-2 pl-4 transition-all hover:text-white hover:bg-blue-600 hover:pl-8 hover:max-w-full"
                  //   onClick={() => setShowUsersDashboard(true)}
                  onClick={() => {
                    setShowUsersDashboard(true);
                    setShowJobDashboard(false);
                  }}
                >
                  Users
                </a>
              </li>
              {/* Add other sidebar links as needed */}
              <li className="nav-item mt-10">
                <a
                  href="#"
                  className="nav-link py-2 pl-4 transition-all hover:text-white hover:bg-blue-600 hover:pl-8 hover:max-w-full"
                  //   onClick={() => setShowJobDashboard(true)}
                  onClick={() => {
                    setShowJobDashboard(true);
                    setShowUsersDashboard(false);
                  }}
                >
                  Job Posting
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <div className="w-3/4 p-8 overflow-y-auto">
          {showUsersDashboard && (
            <>
              <h1 className="text-2xl font-bold mb-8">Users Dashboard</h1>
              <div className="bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-4">Users</h2>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b">
                      <th className="text-left px-4 py-2">Name</th>
                      <th className="text-left px-4 py-2">Email</th>
                      <th className="text-left px-4 py-2">Date Created</th>
                      <th className="text-left px-4 py-2">View Profile</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {users.map((user, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2">{user.name}</td>
                        <td className="px-4 py-2">{user.email}</td>
                        <td className="px-4 py-2">{user.date}</td>
                        <td className="px-4 py-2">
                          <a href="#" className="text-blue-600 hover:underline">
                            View
                          </a>
                        </td>
                      </tr>
                    ))} */}
                    {displayedUsers.map((user, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2">{user.name}</td>
                        <td className="px-4 py-2">{user.email}</td>
                        <td className="px-4 py-2">{user.date}</td>
                        <td className="px-4 py-2">
                          <a href="#" className="text-blue-600 hover:underline">
                            View
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* <div>
                  {displayedUsers.map((user, index) => (
                    <div key={index} className="border p-4 mb-4 rounded">
                      <p className="text-lg font-semibold">{user.name}</p>
                 
                      <p className="text-gray-600">{user.description}</p>
                      <p className="text-gray-600">Posted on: {user.date}</p>
                 
                    </div>
                  ))}
                </div> */}
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
            </>
          )}

          {showJobDashboard && (
            <>
              <h1 className="text-2xl font-bold mb-8">JobPosting Dashboard</h1>
              <div className="bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-4">Jobs</h2>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b">
                      <th className="text-left px-4 py-2">Name</th>
                      <th className="text-left px-4 py-2">Email</th>
                      <th className="text-left px-4 py-2">Date Created</th>
                      <th className="text-left px-4 py-2">View Profile</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {users.map((user, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2">{user.name}</td>
                        <td className="px-4 py-2">{user.email}</td>
                        <td className="px-4 py-2">{user.date}</td>
                        <td className="px-4 py-2">
                          <a href="#" className="text-blue-600 hover:underline">
                            View
                          </a>
                        </td>
                      </tr>
                    ))} */}
                    {displayedJobs.map((job, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2">{job.name}</td>
                        <td className="px-4 py-2">{job.email}</td>
                        <td className="px-4 py-2">{job.date}</td>
                        <td className="px-4 py-2">
                          <a href="#" className="text-blue-600 hover:underline">
                            View
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* <div>
                  {displayedJobs.map((job, index) => (
                    <div key={index} className="border p-4 mb-4 rounded">
                      <p className="text-lg font-semibold">{job.name}</p>
                      <p className="text-gray-600">{job.description}</p>
                      <p className="text-gray-600">Posted on: {job.date}</p>
                    </div>
                  ))}
                </div> */}
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
                    Page {currentPageJobs} of {totalJobsPages}
                  </span>
                  <button
                    onClick={() => paginateJobs(currentPageJobs - 1)}
                    disabled={currentPageJobs === 1}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => paginateJobs(currentPageJobs + 1)}
                    disabled={currentPageJobs === totalJobsPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Footer */}
      {/* <footer className="main-footer bg-gray-800 text-white text-center p-4 absolute bottom-0 w-full"> */}
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
