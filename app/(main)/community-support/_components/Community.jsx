"use client";
import {
  FaRegCommentDots,
  FaUsers,
  FaBookOpen,
  FaSearch,
  FaPlus,
} from "react-icons/fa";
import { useRef, useEffect, useState } from "react";
import { PostQuestion } from "./PostQuestion";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";

export default function CommunitySupport() {
  const questionSectionRef = useRef(null);
  const mentorSectionRef = useRef(null);
  const [stats, setStats] = useState({
    discussions: 0,
    mentors: 0,
  });
  const [topDiscussions, setTopDiscussions] = useState([]);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    
    if (trimmedQuery) {
      router.push(`/community-support/discussions?q=${encodeURIComponent(trimmedQuery)}`);
    }
  };
  

  useEffect(() => {
    const fetchStatsAndDiscussions = async () => {
      try {
        const res = await fetch("/api/community-stats");
        const data = await res.json();
        setStats({
          discussions: data.discussionsLength,
          mentors: 0,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
      try {
        const res = await fetch("/api/discussions");
        const discussions = await res.json();
        const sortedDiscussions = discussions.sort((a, b) => b.views - a.views).slice(0, 3);
        setTopDiscussions(sortedDiscussions);
      } catch (error) {
        console.error("Failed to fetch discussions:", error);
      }
    };
    fetchStatsAndDiscussions();
  }, []);

  // Function to scroll to a section
  const scrollToSection = (ref) => {
    if (ref.current) {
      const elementPosition =
        ref.current.getBoundingClientRect().top + window.scrollY;
      const windowHeight = window.innerHeight;
      const elementHeight = ref.current.offsetHeight;

      // Calculate scroll position to center the section
      const scrollTo = elementPosition - windowHeight / 2 + elementHeight / 2;
      window.scrollTo({ top: scrollTo, behavior: "smooth" });

      // Auto-focus the first input or button in the section
      setTimeout(() => {
        ref.current.querySelector("input, button")?.focus();
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 sm:px-12 py-8">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {[
          { icon: FaRegCommentDots, count: stats.discussions, label: "Active Discussions", color: "text-blue-500" },
          { icon: FaUsers, count: stats.mentors, label: "Available Mentors", color: "text-green-500" },
        ].map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
            <item.icon className={`${item.color} text-3xl mx-auto mb-3`} />
            <h2 className="text-2xl font-bold">{item.count}</h2>
            <p className="text-gray-600 text-sm">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md flex flex-col sm:flex-row gap-3">
        <div className="flex-grow flex items-center border border-gray-300 rounded-lg px-4 py-2">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search discussions..."
            className="w-full outline-none"
          />
        </div>
        <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center">
          <FaSearch />
          Search
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
        <button onClick={() => {
          scrollToSection(questionSectionRef);
        }} className="bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl flex justify-center items-center gap-2 font-medium shadow-md">
          <FaPlus /> Post a Question
        </button>
        <button onClick={() => {
          scrollToSection(mentorSectionRef);
        }} className="bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl flex justify-center items-center gap-2 font-medium shadow-md">
          <FaUsers /> Find a Mentor
        </button>
        <Link href="/community-support/discussions" className="bg-purple-500 hover:bg-purple-600 text-white py-4 rounded-xl flex justify-center items-center gap-2 font-medium shadow-md">
          <FaRegCommentDots /> Join a Discussion
        </Link>
      </div>

      {/* Discussions */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4">Top Discussions</h3>
        {topDiscussions.length > 0 ? (
          topDiscussions.map((discussion) => (
            <div key={discussion.id} className="bg-gray-50 p-5 rounded-lg shadow-sm border mt-4">
              <h4 className="text-lg font-semibold text-gray-800">{discussion.title}</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {discussion.tags.length > 0 ? (
                  discussion.tags.map((tag, index) => (
                    <span key={index} className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded">
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-xs">No tags</span>
                )}
              </div>
              <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                <p>
                  Posted by <span className="font-medium text-gray-700">{discussion.user?.name || "Unknown"}</span>
                  &nbsp;• {discussion.answers.length} replies • {discussion.views} views
                </p>
                <Link href={`/community-support/discussion/${discussion.id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                  View Discussion
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No discussions available.</p>
        )}
      </div>

      {/* Ask a Question Section */}
      <PostQuestion questionSectionRef={questionSectionRef} />

      <div ref={mentorSectionRef} className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">Available Mentors</h3>
        <div className="flex justify-between text-gray-600 text-sm mt-2">
          <p>All Expertise</p>
          <p>Rating</p>
        </div>
        <div className="bg-white p-3 rounded-lg flex items-center gap-3 border mt-3">
          <img
            src="https://placehold.co/50"
            alt="Mentor"
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <h4 className="font-semibold">Ananya Sharma</h4>
            <p className="text-sm text-gray-500">Small business & budgeting</p>
            <p className="text-sm text-yellow-500">⭐ 4.8 (128 reviews)</p>
          </div>
          <button className="bg-green-500 text-white px-3 py-1 rounded">
            Request Mentorship
          </button>
        </div>
      </div>
    </div>
  );
}
