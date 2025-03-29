"use client";
import React, { useState } from "react";

const Page = () => {
  const [language, setLanguage] = useState("English");
  const [completedModules, setCompletedModules] = useState(3); // Tracks completed modules
  const totalModules = 10;

  const handleLanguageChange = async (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    console.log(`Translating content to ${selectedLanguage}`);
  };

  const handleCompleteModule = () => {
    if (completedModules < totalModules) {
      setCompletedModules((prev) => prev + 1); // Increase completed modules
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
      <header className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 mb-6">
        <h1 className="text-2xl font-bold text-blue-600">Learn Finance</h1>
        <div className="flex items-center space-x-4">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="border rounded px-2 py-1"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Profile</button>
        </div>
      </header>

      {/* Course Statistics */}
      <section className="grid grid-cols-4 gap-4 mb-6">
        {[
          { title: "Courses Completed", count: 5, color: "text-blue-600" },
          { title: "Topics in Progress", count: 3, color: "text-green-600" },
          { title: "Time Spent Learning", count: "12h", color: "text-yellow-500" },
          { title: "Day Streak", count: 3, color: "text-red-500" },
        ].map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg p-4 shadow-md text-center">
            <h2 className={`text-xl font-bold ${stat.color}`}>{stat.count}</h2>
            <p className="text-gray-600">{stat.title}</p>
          </div>
        ))}
      </section>

      {/* Course Tracking Section */}
      <section className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-xl font-bold mb-2">Course Tracking</h2>
        <div className="flex justify-between items-center">
          <p className="text-gray-700">
            <strong>{completedModules} / {totalModules} Modules Complete</strong>
          </p>
          <button
            onClick={handleCompleteModule}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Complete Next Module
          </button>
        </div>
        <div className="relative pt-1 mt-4">
          <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
            <div
              className="bg-blue-600"
              style={{ width: `${(completedModules / totalModules) * 100}%` }}
            ></div>
          </div>
        </div>
      </section>

      {/* Centered Video Section */}
      <div className="flex justify-center mb-6">
        <div className="bg-white shadow-lg rounded-lg p-6 w-4/5">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/iZGljcA3G24?si=Kqoj8bF6m5hn0Ecs"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>

          <h2 className="text-xl font-semibold mt-4">Understanding Savings Accounts</h2>
          <p className="text-gray-600 text-sm mb-4">
            <strong>12 min</strong> | Available in 4 languages
          </p>

          <ul className="list-disc pl-6 text-sm text-gray-700 mb-4">
            <li>Different types of savings accounts</li>
            <li>Interest rates and how they work</li>
            <li>Choosing the right account for your needs</li>
          </ul>

          <button className="bg-blue-600 text-white px-6 py-2 rounded">Next Lesson</button>
        </div>
      </div>

      {/* Available Courses */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Available Courses</h2>
        <div className="flex justify-between items-center mb-4">
          <select className="border rounded px-2 py-1">
            <option>All Categories</option>
          </select>
          <select className="border rounded px-2 py-1">
            <option>Most Popular</option>
          </select>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Budgeting Basics</h3>
            <span className="text-gray-500">Beginner</span>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Learn how to manage your monthly expenses effectively.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded">Start Course</button>
        </div>
      </section>

      {/* Documentation Section */}
      <section className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-2">Documentations</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-100 rounded-lg">
            <h3 className="font-semibold">{completedModules} / {totalModules} Modules Complete</h3>
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                <div
                  className="bg-blue-600"
                  style={{ width: `${(completedModules / totalModules) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-green-100 rounded-lg text-center">
            <h3 className="text-lg font-semibold">5 Day Streak</h3>
            <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded">
              Start New Module
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
