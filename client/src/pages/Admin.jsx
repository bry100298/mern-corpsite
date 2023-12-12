import React from "react";

export default function Admin() {
  const users = [
    {
      name: "Bryan Pogi",
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
  ];

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
                <a href="#" className="nav-link py-2 pl-4 transition-all hover:text-white hover:bg-blue-600 hover:pl-8 hover:max-w-full">
                  Users
                </a>
              </li>
              {/* Add other sidebar links as needed */}
              <li className="nav-item">
                <a href="#" className="nav-link py-2 pl-4 transition-all hover:text-white hover:bg-blue-600 hover:pl-8 hover:max-w-full">
                  Job Posting List
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <div className="w-3/4 p-8">
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
                {users.map((user, index) => (
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
          </div>
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
