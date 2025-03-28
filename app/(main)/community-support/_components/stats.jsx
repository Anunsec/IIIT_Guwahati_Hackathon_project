import { db } from "@/lib/prisma";
import { FaRegCommentDots, FaUsers, FaBookOpen } from "react-icons/fa";

export const Stats = () => {
  const discussionsLength = db.question;
  return (
    <div className="grid grid-cols-3 gap-4 my-6">
      <div className="bg-white p-4 rounded-lg shadow-md text-center">
        <FaRegCommentDots className="text-blue-500 text-2xl mx-auto mb-2" />
        <h2 className="text-xl font-semibold">{discussionsLength}</h2>
        <p className="text-gray-500 text-sm">Active Discussions</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md text-center">
        <FaUsers className="text-green-500 text-2xl mx-auto mb-2" />
        <h2 className="text-xl font-semibold">42</h2>
        <p className="text-gray-500 text-sm">Available Mentors</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md text-center">
        <FaBookOpen className="text-yellow-500 text-2xl mx-auto mb-2" />
        <h2 className="text-xl font-semibold">156</h2>
        <p className="text-gray-500 text-sm">Knowledge Base</p>
      </div>
    </div>
  );
};
