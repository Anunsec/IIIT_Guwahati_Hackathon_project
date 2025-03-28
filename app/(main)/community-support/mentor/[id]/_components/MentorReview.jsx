"use client";

import { useState } from "react";
import { createReviewOfMentor } from "@/actions/community-support";

export const MentorReview = ({ mentor }) => {
  const [reviews, setReviews] = useState(mentor.reviews || []);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const newReview = await createReviewOfMentor({
        mentorId: mentor.id,
        content: reviewText,
        rating,
      });

      // Update the UI with the new review
      setReviews((prevReviews) => [...prevReviews, newReview]);
      setReviewText(""); // Clear the form
      setRating(5); // Reset rating
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Reviews</h3>

      {/* Review List */}
      {reviews.length > 0 ? (
        <div className="mt-2 space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm text-gray-700">⭐ {review.rating}/5</p>
              <p className="text-sm">{review.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-2">No reviews yet.</p>
      )}

      {/* Add Review Form */}
      <form onSubmit={handleSubmit} className="mt-4 p-4 border rounded-lg">
        <h4 className="font-semibold">Write a Review</h4>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Rating Selector */}
        <div className="mt-2">
          <label className="block text-sm font-medium">Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="mt-1 p-2 border rounded w-full"
          >
            {[5, 4, 3, 2, 1].map((star) => (
              <option key={star} value={star}>
                {star} Stars
              </option>
            ))}
          </select>
        </div>

        {/* Review Input */}
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review..."
          className="mt-2 w-full p-2 border rounded"
          rows="3"
          required
        ></textarea>

        <button
          type="submit"
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};
