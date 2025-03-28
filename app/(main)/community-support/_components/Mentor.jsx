"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const MentorList = ({ mentorSectionRef }) => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await fetch("/api/mentors");
        const data = await res.json();
        setMentors(data);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  return (
    <div ref={mentorSectionRef} className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">Available Mentors</h3>
      <div className="flex justify-between text-gray-600 text-sm mt-2">
        <p>All Expertise</p>
        <p>Rating</p>
      </div>

      {loading ? (
        <p className="text-gray-500 mt-3">Loading mentors...</p>
      ) : mentors.length > 0 ? (
        mentors.map((mentor) => {
          const avgRating =
            mentor.reviews.length > 0
              ? (
                  mentor.reviews.reduce((sum, r) => sum + r.rating, 0) / mentor.reviews.length
                ).toFixed(1)
              : "No ratings";

          return (
            <div
              key={mentor.id}
              className="bg-white p-3 rounded-lg flex items-center gap-3 border mt-3"
            >
              <img
                src={mentor.imageUrl || "https://placehold.co/50"}
                alt={mentor.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <h4 className="font-semibold">{mentor.name}</h4>

                {/* Expertise Badges */}
                <div className="flex flex-wrap gap-2 mt-1">
                  {mentor.expertise?.length > 0 ? (
                    mentor.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="text-xs font-medium bg-blue-100 text-blue-600 px-2 py-1 rounded-md"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">No expertise listed</span>
                  )}
                </div>

                <p className="text-sm text-yellow-500 mt-1">
                  ⭐ {avgRating} ({mentor.reviews.length} reviews)
                </p>
              </div>
              
              {/* View Details Button */}
              <Link
                href={`/community-support/mentor/${mentor.id}`} 
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
              >
                View Details
              </Link>
            </div>
          );
        })
      ) : (
        <p className="text-gray-500 mt-3">No mentors available</p>
      )}
    </div>
  );
};
