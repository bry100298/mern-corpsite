import React from "react";

export default function Search() {
  const jobs = [
    {
      title: "Web Developer",
      company: "Speech Improvement Center",
      location: "Manila",
      salary: "PHP 25,000 - PHP 44,000 a month",
      type: "Full-time",
      tags: ["Easy apply", "Urgently hiring"],
      skills: ["WordPress (required)", "CSS"],
      details:
        "Creating dynamic & user friendly website. Regular website maintenance and security updates. Minimum 4 years of experience with WordPress.",
      posted: "1 day ago",
    },
    {
      title: "Wordpress Web Developer (Entry Level)",
      company: "Stone Refo",
      location: "Manila",
      salary: "PHP 30,000 a month",
      type: "Full-time",
      tags: ["Easy apply", "Urgently hiring"],
      skills: ["Demonstrable graphic design skills with strong portfolio"],
      details: "Remote & Flexible Schedule. Monday to Friday.",
      posted: "Three weeks ago",
    },
    {
      title: "Wordpress Web Developer (Entry Level)",
      company: "Stone Refo",
      location: "Manila",
      salary: "PHP 30,000 a month",
      type: "Full-time",
      tags: ["Easy apply", "Urgently hiring"],
      skills: ["Demonstrable graphic design skills with strong portfolio"],
      details: "Remote & Flexible Schedule. Monday to Friday.",
      posted: "Three weeks ago",
    },
    {
      title: "Wordpress Web Developer (Entry Level)",
      company: "Stone Refo",
      location: "Manila",
      salary: "PHP 30,000 a month",
      type: "Full-time",
      tags: ["Easy apply", "Urgently hiring"],
      skills: ["Demonstrable graphic design skills with strong portfolio"],
      details: "Remote & Flexible Schedule. Monday to Friday.",
      posted: "Three weeks ago",
    },
    {
      title: "Wordpress Web Developer (Entry Level)",
      company: "Stone Refo",
      location: "Manila",
      salary: "PHP 30,000 a month",
      type: "Full-time",
      tags: ["Easy apply", "Urgently hiring"],
      skills: ["Demonstrable graphic design skills with strong portfolio"],
      details: "Remote & Flexible Schedule. Monday to Friday.",
      posted: "Three weeks ago",
    },
  ];

  function JobCard({ job }) {
    return (
      <div className="bg-white shadow-md rounded-md p-4 mb-4">
        <h3 className="text-lg font-bold">{job.title}</h3>
        <p className="text-gray-600">{job.company}</p>
        <p className="text-gray-600">{job.location}</p>
        <p className="text-gray-600">{job.salary}</p>
        <p className="text-gray-600">{job.type}</p>
        <div className="flex space-x-2 mt-2">
          {job.tags.map((tag) => (
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-sm text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // Define a custom component for rendering the expanded view of a job
  function JobDetails({ job }) {
    return (
      <div className="bg-white shadow-md rounded-md p-4">
        <h3 className="text-lg font-bold">{job.title}</h3>
        <p className="text-gray-600">{job.company}</p>
        <p className="text-gray-600">{job.location}</p>
        <p className="text-gray-600">{job.salary}</p>
        <p className="text-gray-600">{job.type}</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4">
          Apply now
        </button>
        <div className="mt-4">
          <h4 className="text-lg font-bold">Profile insights</h4>
          <p className="text-gray-600">
            Here's how this job's qualifications align with your profile:
          </p>
          <ul className="list-disc list-inside">
            {job.skills.map((skill) => (
              <li className="text-gray-600">{skill}</li>
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
            <li className="text-gray-600">Job type: {job.type}</li>
          </ul>
        </div>
      </div>
    );
  }

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
            {jobs.map((job) => (
              <JobCard job={job} />
            ))}
          </div>
          <div className="col-span-1">
            <JobDetails job={jobs[0]} />
          </div>
        </div>
      </div>
    </div>
  );
}
