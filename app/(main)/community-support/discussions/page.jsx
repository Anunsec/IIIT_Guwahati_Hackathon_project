import { db } from "@/lib/prisma";
import Link from "next/link";

const Page = async ({ searchParams }) => {
  const { q } = searchParams;

  const discussions = await db.question.findMany({
    where: q
      ? {
          OR: [{ title: { contains: q, mode: "insensitive" } }],
        }
      : {}, // If no query, fetch all discussions
    include: {
      answers: true,
      user: true,
    },
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {discussions.length > 0 ? (
        discussions.map((question) => (
          <div
            key={question.id}
            className="bg-white p-5 rounded-lg shadow-md border"
          >
            {/* Question Title */}
            <h3 className="text-xl font-semibold text-gray-800">
              {question.title}
            </h3>

            {/* User Info */}
            <p className="text-sm text-gray-500 mt-1">
              Posted by{" "}
              <span className="font-medium text-gray-700">
                {question.user?.name || "Unknown User"}
              </span>
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              {question.tags.length > 0 ? (
                question.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 text-xs">No tags</span>
              )}
            </div>

            {/* Meta Info */}
            <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
              <p>
                <span className="font-medium text-gray-700">
                  {question.answers.length}
                </span>{" "}
                replies •{" "}
                <span className="font-medium text-gray-700">
                  {question.views}
                </span>{" "}
                views
              </p>
              <Link
                href={`discussion/${question.id}`}
                className="bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded-lg text-sm"
              >
                View Discussion
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center py-10">
          No discussions found. Try searching for something else.
        </p>
      )}
    </div>
  );
};

export default Page;
