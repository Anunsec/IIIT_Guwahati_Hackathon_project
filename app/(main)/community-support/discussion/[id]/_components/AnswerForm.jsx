"use client";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import { createAnswer } from "@/actions/community-support";

export const AnswerForm = ({ questionId }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    setError("");

    try {
      await createAnswer({ content, questionId });

      // Reset form after successful submission
      setContent("");
      router.refresh(); // Refresh page to update UI
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
      <h3 className="text-md font-semibold">Your Answer</h3>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <form onSubmit={handleSubmit} className="mt-3 space-y-3">
        <textarea
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300"
          rows="4"
          placeholder="Write your answer..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          disabled={loading}
        />
        <button
          type="submit"
          className={`w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Answer"}
        </button>
      </form>
    </div>
  );
};
