import React, { useEffect, useState } from "react";
import { viewMyComplaint } from "../../api/api";
import { useNavigate } from "react-router-dom";

function MyComplaint() {
  const [myComplaints, setMyComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyComplaint = async () => {
      const id = localStorage.getItem("id");
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const res = await viewMyComplaint(id);

        setMyComplaints(res?.data?.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyComplaint();
  }, []);

  const handleView = async (id) => {
    navigate(`/viewComplaint?id=${id}`);
  };

  return (
    <div className="w-full min-h-screen ">
      <div className=" bg-white shadow-lg min-h-screen rounded-2xl p-6 md:p-16 overflow-hidden">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-8">
          My Complaints
        </h2>
        {loading ? (
          <p className="text-center text-gray-500 text-lg">
            Loading complaints...
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-blue-400 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Complaint</th>
                  <th className="py-3 px-4 text-left">Complaint Type</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Location</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">View Complaint</th>
                </tr>
              </thead>
              <tbody>
                {myComplaints.length > 0 ? (
                  myComplaints.map((complaint, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-blue-50 transition-all"
                    >
                      <td className="py-3 px-4">{complaint.complaint}</td>
                      <td className="py-3 px-4">{complaint.complaintType}</td>
                      <td className="py-3 px-4">{complaint.date}</td>
                      <td className="py-3 px-4">{complaint.location}</td>
                      <td
                        style={{
                          color:
                            complaint.status === "Accepted"
                              ? "green"
                              : complaint.status === "Rejected"
                              ? "red"
                              : complaint.status === "Solved"
                              ? "blue"
                              : "orange",
                        }}
                      >
                        {complaint.status || "Pending"}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleView(complaint._id)}
                          className="bg-green-500 text-white px-4 py-1 mb-2 rounded hover:bg-green-600  transition-all"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-gray-500 py-6 ">
                      No Registered Complaints
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyComplaint;
