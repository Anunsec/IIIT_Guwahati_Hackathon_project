import { db } from "@/lib/prisma";
import { AnswerForm } from "./_components/AnswerForm";
import AnswerSection from "./_components/AnswerSection";

const Page = async ({ params }) => {
  const { id } = params;

  // Fetch the question by ID with related answers and category
  const question = await db.question.findUnique({
    where: { id },
    include: {
      answers: {
        include: { user: true },
      },
      category: true,
      user: true,
    },
  });

  await db.question.update({
    where: { id },
    data: { views: question.views + 1 },
  });

  if (!question) {
    return (
      <div className="text-center text-gray-500 py-10">
        <h2 className="text-xl font-semibold">Question not found</h2>
        <p>It may have been deleted or does not exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Question Header */}
      <h1 className="text-2xl font-bold">{question.title}</h1>
      <p className="text-gray-600 mt-2">{question.description}</p>

      {/* Category & Tags */}
      <div className="flex flex-wrap items-center gap-2 mt-3">
        {question.category && (
          <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded">
            {question.category.name}
          </span>
        )}
        {question.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Meta Info */}
      <div className="mt-4 text-gray-500 text-sm flex justify-between items-center">
        <p>
          Asked by <span className="font-semibold">{question.user.name}</span>
        </p>
        <p>{question.views} views</p>
      </div>
      {/* Answer Form */}
      <AnswerForm questionId={id} />

      {/* Answers Section */}
      <AnswerSection answers={question.answers} />
    </div>
  );
};

export default Page;
