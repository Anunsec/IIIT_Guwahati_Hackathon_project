"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown"; // Importing ReactMarkdown for rendering markdown
import remarkGfm from "remark-gfm"; // To handle GitHub-flavored markdown

const Page = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [role, setRole] = useState(1); // Default role: financial assistant

  const roles = [
    { id: 1, name: "Financial Assistant" },
    { id: 2, name: "Investment Advisor" },
    { id: 3, name: "Loan Approval Assistant" },
    { id: 4, name: "Market Analyst" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Append user's message to chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", text: userInput },
    ]);

    setLoading(true);
    setError(null);
    setUserInput(""); // Clear input field

    // Show "Response is coming..." placeholder
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "bot", text: "..." }, // This represents the typing indicator
    ]);

    try {
      const res = await fetch("/api/chatbot/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userInput,
          role_number: role,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        // Replace typing indicator with the actual bot response
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1), // Remove the typing indicator
          {
            type: "bot",
            text:
              data.reply ||
              data.recommendations ||
              data.approval_status ||
              data.forecast,
          },
        ]);
      } else {
        setError(data.error || "Something went wrong!");
      }
    } catch (err) {
      setError("Failed to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-8">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-xl">
        <h1 className="text-2xl font-semibold mb-6 text-center text-blue-600">
          Chatbot
        </h1>

        {/* Chat Messages Display */}
        <div className="space-y-4 overflow-y-auto max-h-96 mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-md">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-3 rounded-lg max-w-[70%] break-words shadow-md ${
                  msg.type === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text === "..."
                  ? (
                    <div className="animate-pulse">
                      <span className="dot">.</span>
                      <span className="dot">.</span>
                      <span className="dot">.</span>
                    </div>
                  ) : (
                    // Render bot's response using ReactMarkdown
                    <ReactMarkdown children={msg.text} remarkPlugins={[remarkGfm]} />
                  )}
              </div>
            </div>
          ))}
        </div>

        {/* User Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask me anything about finance!"
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="w-[80%] py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? "Loading..." : "Send"}
            </button>

            {/* Role Selector */}
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(Number(e.target.value))}
              className="w-[18%] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {roles.map((roleOption) => (
                <option key={roleOption.id} value={roleOption.id}>
                  {roleOption.name}
                </option>
              ))}
            </select>
          </div>
        </form>

        {/* Error Handling */}
        {error && (
          <div className="mt-6 bg-red-100 p-4 rounded-md border border-red-300">
            <h3 className="font-semibold text-red-700">Error</h3>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
