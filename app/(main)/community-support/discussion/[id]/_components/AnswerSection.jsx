"use client";

import React, { useState } from "react";
import { upvoteAnswer } from "@/actions/community-support";

const AnswerSection = ({ answers }) => {
  // Local state for upvotes (to update UI optimistically)
  const [answerList, setAnswerList] = useState(answers);

  const handleUpvote = async (answerId) => {
    try {
      // Optimistic UI update
      setAnswerList((prevAnswers) =>
        prevAnswers.map((answer) =>
          answer.id === answerId
            ? { ...answer, upvotes: answer.upvotes + 1 }
            : answer
        )
      );

      // Call server-side action
      await upvoteAnswer(answerId);
    } catch (error) {
      console.error("Failed to upvote:", error);
      // Rollback UI change if upvote fails
      setAnswerList(answers);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold">{answerList.length} Answers</h2>
      <div className="mt-4 space-y-4">
        {answerList.length > 0 ? (
          answerList.map((answer) => (
            <div key={answer.id} className="p-4 border rounded-lg bg-gray-50">
              <p className="text-gray-700">{answer.content}</p>
              <div className="mt-3 text-sm text-gray-500 flex justify-between">
                <p>
                  Answered by{" "}
                  <span className="font-semibold">{answer.user.name}</span>
                </p>
                <button
                  onClick={() => handleUpvote(answer.id)}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                >
                  👍 <span>{answer.upvotes}</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">
            No answers yet. Be the first to answer!
          </p>
        )}
      </div>
    </div>
  );
};

export default AnswerSection;
