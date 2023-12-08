import React from "react";

export default function Careers() {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Join Our Team
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Job Postings */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Senior Software Engineer
            </h2>
            <p className="text-gray-600 mb-4">
              We are looking for a talented Senior Software Engineer to join our
              team. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              feugiat, diam nec ultrices vestibulum.
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Apply Now
            </button>
          </div>

          {/* Job Postings */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Marketing Manager
            </h2>
            <p className="text-gray-600 mb-4">
              Join our team as a Marketing Manager and be a part of our exciting
              growth. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed feugiat, diam nec ultrices vestibulum.
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Apply Now
            </button>
          </div>

          {/* Add more job postings here */}
        </div>
      </div>
    </div>
  );
}
