import React, { useState } from "react";
import toast from "react-hot-toast";
import { createFeedback } from "../api/api";

function Feedback() {
  const id = localStorage.getItem("id");
  const [feedback, setFeedback] = useState({
    feedback: "",
    createdBy: id,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedback.feedback.trim()) {
      toast.error("Feedback is required");
      return;
    }

    try {
      const res = await createFeedback(feedback);

      switch (res.status) {
        case 201:
          toast.success("Feedback submitted successfully!");
          setFeedback((prev) => ({ ...prev, feedback: "" }));
          break;
        case 400:
          toast.error("Feedback and user ID are required");
          break;
        case 500:
          toast.error("Feedback couldn't be submitted");
          break;
        default:
          toast.error("Unexpected error occurred");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <div className="mb-6 p-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-medium text-gray-700 mb-4">
          Your Feedback
        </h2>

        <div className="flex flex-col md:flex-row gap-10 p-5 border border-gray-200 rounded-lg shadow-sm bg-white">
          <textarea
            id="feedback"
            placeholder="Write your feedback here..."
            value={feedback.feedback}
            onChange={(e) =>
              setFeedback((prev) => ({
                ...prev,
                feedback: e.target.value,
              }))
            }
            className="w-full md:w-2/3 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none"
            rows="4"
            aria-label="Feedback textarea"
          ></textarea>

          <button
            type="submit"
            className="h-10 px-6 mt-20 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition duration-200"
            onClick={handleSubmit}
            aria-label="Submit feedback"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
