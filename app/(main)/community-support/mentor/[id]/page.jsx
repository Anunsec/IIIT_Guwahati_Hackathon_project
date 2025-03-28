import { db } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MentorReview } from "./_components/MentorReview";

const MentorDetailPage = async ({ params }) => {
  const { id } = await params;

  // Fetch mentor details from the database
  const mentor = await db.mentor.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      expertise: true,
      email: true,   // Explicitly select email
      phone: true,   // Explicitly select phone
      reviews: true
    },
  });
  

  if (!mentor) {
    return notFound();
  }


//   console.log(mentor);

  // Calculate average rating
  const avgRating =
    mentor.reviews.length > 0
      ? (
          mentor.reviews.reduce((sum, r) => sum + r.rating, 0) /
          mentor.reviews.length
        ).toFixed(1)
      : "No ratings";

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <Link href="/community-support" className="text-blue-600 hover:underline mb-4 block">
        ← Back to Mentors
      </Link>

      <div className="flex items-center gap-4">
        <img
          src={mentor.imageUrl || "https://placehold.co/100"}
          alt={mentor.name}
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <h2 className="text-2xl font-bold">{mentor.name}</h2>
          <p className="text-yellow-500">⭐ {avgRating} ({mentor.reviews.length} reviews)</p>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Expertise</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {mentor.expertise.map((skill, index) => (
            <span key={index} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Contact</h3>
        <ul className="mt-2 space-y-2">
          {mentor.email && (
            <li>
              📧 <a href={`mailto:${mentor.email}`} className="text-blue-600 hover:underline">
                {mentor.email}
              </a>
            </li>
          )}
          {mentor.phone && <li>📞 {mentor.phone}</li>}
          {mentor.linkedIn && (
            <li>
              🔗 <a href={mentor.linkedIn} target="_blank" className="text-blue-600 hover:underline">
                LinkedIn Profile
              </a>
            </li>
          )}
          {mentor.website && (
            <li>
              🌐 <a href={mentor.website} target="_blank" className="text-blue-600 hover:underline">
                Personal Website
              </a>
            </li>
          )}
        </ul>
      </div>

        <MentorReview mentor={mentor} />
    </div>
  );
};

export default MentorDetailPage;
