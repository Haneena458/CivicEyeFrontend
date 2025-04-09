import React, { useEffect, useState } from "react";
import { viewAllComplaint, viewAllUser } from "../../api/api";
import { useNavigate } from "react-router-dom";

function Complaint() {
  const [complaint, setComplaint] = useState([]);
  const [sortOrder, setsortOrder] = useState("asc");
  const [userMap, setUserMap] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const res = await viewAllComplaint();
        setComplaint(res?.data.data || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComplaint();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await viewAllUser();
        const users = res?.data.data || [];

        const map = {};
        users.forEach((user) => {
          map[user._id] = user.name;
        });

        setUserMap(map);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const toggleSortOrder = () =>
    setsortOrder((prev) => (prev === "asc" ? "desc" : "asc"));

  const sortBy = (key) => {
    const sorted = [...complaint].sort((a, b) => {
      let valA, valB;

      if (key === "name") {
        valA = userMap[a.createdBy] || "Unknown";
        valB = userMap[b.createdBy] || "Unknown";
      } else if (key === "date") {
        valA = new Date(a[key]);
        valB = new Date(b[key]);
      } else {
        valA = a[key] || "NA";
        valB = b[key] || "NA";
      }

      if (key === "date") {
        return sortOrder === "asc" ? valA - valB : valB - valA;
      }

      return sortOrder === "asc"
        ? valA.toString().localeCompare(valB.toString())
        : valB.toString().localeCompare(valA.toString());
    });

    setComplaint(sorted);
    toggleSortOrder();
  };

  const handleView = async (id) => {
    navigate(`/viewComplaint?id=${id}`);
  };

  return (
    <div className="min-h-screen bg-blue-50 rounded-lg p-10">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl p-6 overflow-x-auto">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4 p-5">
          Complaints
        </h2>
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => sortBy("name")}
            className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded"
          >
            Sort by Name
          </button>
          <button
            onClick={() => sortBy("date")}
            className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded"
          >
            Sort by Date
          </button>
          <button
            onClick={() => sortBy("status")}
            className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded"
          >
            Sort by Status
          </button>
          <button
            onClick={() => sortBy("complaint")}
            className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded"
          >
            Sort by complaint
          </button>
        </div>
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="py-3 px-4 border border-gray-300 text-left">
                Complaint
              </th>
              <th className="py-3 px-4 border border-gray-300 text-left">
                Complaint Type
              </th>
              <th className="py-3 px-4 border border-gray-300 text-left">
                Name
              </th>
              <th className="py-3 px-4 border border-gray-300 text-left">
                Date
              </th>
              <th className="py-3 px-4 border border-gray-300 text-left">
                Location
              </th>
              <th className="py-3 px-4 border border-gray-300 text-left">
                Current Status
              </th>
              <th className="py-3 px-4 border border-gray-300 text-left">
                View Complaint
              </th>
            </tr>
          </thead>
          <tbody>
            {complaint.length > 0 ? (
              complaint.map((complaintItem, index) => (
                <tr
                  key={index}
                  className="border border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-2 px-4 border border-gray-300">
                    {complaintItem.complaint}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {complaintItem.complaintType}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {userMap[complaintItem.createdBy] || "Unknown"}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {complaintItem.date}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {complaintItem.location}
                  </td>
                  <td
                    style={{
                      color:
                        complaintItem.status === "Accepted"
                          ? "green"
                          : complaintItem.status === "Rejected"
                          ? "red"
                          : complaintItem.status === "Solved"
                          ? "blue"
                          : "orange",
                    }}
                    className="py-2 px-4 border border-gray-300"
                  >
                    {complaintItem.status || "Pending"}
                  </td>

                  <td className="py-2 px-4 border border-gray-300">
                    <button
                      onClick={() => handleView(complaintItem._id)}
                      className="bg-cyan-500 text-white px-4 py-1 mb-2 rounded hover:bg-cyan-600 transition-all"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-4">
                  No Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Complaint;
