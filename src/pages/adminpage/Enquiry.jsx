import React, { useState, useEffect } from "react";
import { updateEnquiry, viewAllEnquiry } from "../../api/api";

function Enquiry() {
  const [enquiries, setEnquiries] = useState([]);
  const [replies, setReplies] = useState({});

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await viewAllEnquiry();
        setEnquiries(res?.data?.data || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEnquiries();
  }, []);

  const handleReplyChange = (id, value) => {
    setReplies((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleReplySubmit = async (id) => {
    const enquiry = enquiries.find((e) => e._id === id);
    const reply = replies[id];
    try {
      await updateEnquiry(id, {
        message: enquiry.message,
        reply: reply,
      });
      setEnquiries(
        enquiries.map((e) =>
          e._id === id ? { ...e, reply } : e
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl p-6 overflow-x-auto">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4 p-5">
        Enquiries
      </h2>
      <table className="w-full border-collapse border border-gray-200 ">
        <thead className="bg-blue-50">
          <tr>
            <th className="py-3 px-4 border border-gray-300">Name</th>
            <th className="py-3 px-4 border border-gray-300">Email</th>
            <th className="py-3 px-4 border border-gray-300">Message</th>
            <th className="py-3 px-4 border border-gray-300">Reply</th>
            <th className="py-3 px-4 border border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {enquiries.length > 0 ? (
            enquiries.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border border-gray-300">{item.name}</td>
                <td className="py-2 px-4 border border-gray-300">{item.email}</td>
                <td className="py-2 px-4 border border-gray-300">{item.message}</td>
                <td className="py-2 px-4 border border-gray-300">
                  {item.reply || "No reply yet"}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  <input
                    type="text"
                    placeholder="Enter reply"
                    value={replies[item._id] || ""}
                    onChange={(e) => handleReplyChange(item._id, e.target.value)}
                    className="border px-2 py-1 rounded"
                  />
                  <button
                    onClick={() => handleReplySubmit(item._id)}
                    className="ml-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No enquiries found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Enquiry;
