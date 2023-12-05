import React from "react";

export default function About() {
  return (
    <div className="bg-gradient-to-b from-blue-500 to-blue-700 h-screen flex justify-center items-center">
      <div className="max-w-4xl mx-auto text-white text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          Welcome to Our School
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Where Learning Knows No Bounds
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-lg bg-blue-800">
            <h2 className="text-2xl font-semibold mb-4">Explore</h2>
            <p className="text-lg">
              Discover our curriculum, programs, and extracurricular activities.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-blue-800">
            <h2 className="text-2xl font-semibold mb-4">Join Us</h2>
            <p className="text-lg">
              Enroll in our vibrant community dedicated to growth and success.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-blue-800">
            <h2 className="text-2xl font-semibold mb-4">Connect</h2>
            <p className="text-lg">
              Engage with our faculty, students, and alumni network.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
