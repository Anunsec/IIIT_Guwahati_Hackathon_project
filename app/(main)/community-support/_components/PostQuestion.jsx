"use client";
import { useEffect, useState } from "react";
import { createQuestion } from "@/actions/community-support";
import { useRouter } from "nextjs-toploader/app";

export const PostQuestion = ({ questionSectionRef }) => {
  const [data, setData] = useState({
    title: "",
    description: "",
    categoryId: "",
    tags: [],
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/category/");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handlePostQuestion = async () => {
    if (!data.title || !data.description || !data.categoryId) {
      alert("Please fill in all required fields.");
      return;
    }

    setPosting(true); // Start loading
    try {
      // console.log("Posting question:", data);
      const question = await createQuestion(data);
      router.push(`/community-support/discussion/${question.id}`);
    } catch (err) {
      alert("Error posting question. Please try again.");
    } finally {
      setPosting(false); // Stop loading
    }
  };

  const handleTagsChange = (e) => {
    const tagsArray = e.target.value.split(",").map(tag => tag.trim());
    setData({ ...data, tags: tagsArray });
  };

  return (
    <div ref={questionSectionRef} className="bg-white p-4 rounded-lg shadow-md my-6">
      <h3 className="text-lg font-semibold">Ask a Question</h3>
      <input
        type="text"
        placeholder="Where's your question?"
        className="border w-full p-2 rounded mt-2"
        value={data.title}
        onChange={(e) => setData({ ...data, title: e.target.value })}
      />
      <textarea
        placeholder="Provide more details..."
        className="border w-full p-2 rounded mt-2 h-24"
        value={data.description}
        onChange={(e) => setData({ ...data, description: e.target.value })}
      ></textarea>
      
      <div className="flex gap-2 mt-2">
        <select
          className="border p-2 rounded w-1/2"
          value={data.categoryId}
          onChange={(e) => setData({ ...data, categoryId: e.target.value })}
        >
          <option value="">Select Category</option>
          {loading ? (
            <option disabled>Loading...</option>
          ) : error ? (
            <option disabled>Error loading categories</option>
          ) : (
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))
          )}
        </select>
        
        <input
          type="text"
          placeholder="Add tags (comma separated)"
          className="border p-2 rounded w-1/2"
          value={data.tags.join(", ")}
          onChange={handleTagsChange}
        />
      </div>

      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mt-3 flex items-center justify-center"
        onClick={handlePostQuestion}
        disabled={posting}
      >
        {posting ? (
          <>
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4l-3 3 3 3v-4z"
              ></path>
            </svg>
            Posting...
          </>
        ) : (
          "Post Question"
        )}
      </button>
    </div>
  );
};
