import React, { useEffect, useState } from "react";
import { updateFeedback, viewAllFeedback } from "../../api/api";

function Feedback() {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await viewAllFeedback();
        console.log(res);
        
        setFeedback(res?.data.data || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFeedback();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      const updatedItem = feedback.find((item) => item._id === id);
      if (!updatedItem) return;

      await updateFeedback(id, {
        feedback: updatedItem.feedback,
        status: status,
      });

      setFeedback(
        feedback.map((item) =>
          item._id === id ? { ...item, status: status } : item
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleAccept = (id) => handleStatusUpdate(id, "Accepted");
  const handleReject = (id) => handleStatusUpdate(id, "Rejected");

  return (
    <div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl p-6 overflow-x-auto">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4 p-5">
        Feedbacks
      </h2>

      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-blue-50">
          <tr>
            <th className="py-3 px-4 border border-gray-300 text-left">
              Feedback
            </th>
            <th className="py-3 px-4 border border-gray-300 text-left">
              User Name
            </th>
            <th className="py-3 px-4 border border-gray-300 text-left">
              Current Status
            </th>
            <th className="py-3 px-4 border border-gray-300 text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {feedback.length > 0 ? (
            feedback.map((item, index) => (
              <tr
                key={index}
                className="border border-gray-200 hover:bg-gray-50"
              >
                <td className="py-2 px-4 border border-gray-300">
                  {item.feedback}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {item.createdBy?.name || "Unknown"}
                </td>
                <td
                  style={{
                    color:
                      item.status === "Accepted"
                        ? "green"
                        : item.status === "Rejected"
                        ? "red"
                        : "orange",
                  }}
                  className="py-2 px-4 border border-gray-300"
                >
                  {item.status || "Pending"}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {item.status !== "Accepted" && item.status !== "Rejected" ? (
                    <div className="flex justify-evenly">
                      <button
                        onClick={() => handleAccept(item._id)}
                        className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition-all"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(item._id)}
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-all"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-gray-500 py-4">
                No Data Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Feedback;
