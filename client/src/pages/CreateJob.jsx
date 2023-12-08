import React from "react";

export default function CreateJob() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 mb-8">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Post a job on JobBoard
        </h1>
        {/* <p className="text-lg mb-6">
          Find the best talent from around the world on the most exclusive job
          board on the internet.
        </p> */}
        <form className="max-w-md mx-auto bg-white shadow-md rounded-lg px-8 py-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">1. Your company</h2>
          <div className="mb-4">
            <label
              htmlFor="companyName"
              className="block text-gray-700 font-semibold mb-2"
            >
              Company Name *
            </label>
            <input
              type="text"
              id="companyName"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="E.g., Acme Inc."
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="contactEmail"
              className="block text-gray-700 font-semibold mb-2"
            >
              Contact Email *
            </label>
            <input
              type="email"
              id="contactEmail"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="E.g., example@acme.com"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="companyLogo"
              className="block text-gray-700 font-semibold mb-2"
            >
              Company Logo (optional)
            </label>
            {/* <div className="flex items-center justify-between border border-gray-300 rounded-md py-2 px-3">
              <label htmlFor="images" className="cursor-pointer text-blue-500">
                Upload
                <input
                  type="file"
                  id="images"
                  accept="image/*"
                  // multiple
                  // className="hidden"
                />
              </label>
              <span className="text-gray-500">No file chosen</span>
            </div> */}
            <div className="flex gap-4">
              <input
                className="p-3 border border-gray-300 rounded w-full"
                type="file"
                id="images"
                accept="image/*"
                multiple
              />
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Upload
              </button>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">2. The role</h2>
          <div className="mb-4">
            <label
              htmlFor="positionName"
              className="block text-gray-700 font-semibold mb-2"
            >
              Position Name *
            </label>
            <input
              type="text"
              id="positionName"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="E.g., Senior Software Engineer"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-gray-700 font-semibold mb-2"
            >
              Role *
            </label>
            <textarea
              id="role"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Programming, Design, etc."
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="commitment"
              className="block text-gray-700 font-semibold mb-2"
            >
              Commitment *
            </label>
            <select
              id="commitment"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            >
              <option value="fullTime">Full-time</option>
              <option value="partTime">Part-time</option>
              <option value="contract">Contract</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="jobDescription"
              className="block text-gray-700 font-semibold mb-2"
            >
              Job Description *
            </label>
            <textarea
              id="jobDescription"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Describe the job..."
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="salary"
              className="block text-gray-700 font-semibold mb-2"
            >
              Salary (optional)
            </label>
            <input
              type="text"
              id="salary"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Example: “$100,000 - $170,000 USD”"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
