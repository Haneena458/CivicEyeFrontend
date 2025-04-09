import {
  faCalendarDays,
  faCircleCheck,
  faClock,
  faThumbsDown,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { viewAllComplaint } from "../../api/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [thisMonth, setThisMonth] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ["#00C49F", "#FFBB28", "#FF4C4C", "#00F67C"];

  const getStatusCount = (status) =>
    complaints.filter((item) => item.status === status).length;

  const barData = [
    { name: "Verified", count: getStatusCount("Accepted") },
    { name: "Pending", count: getStatusCount("Pending") },
    { name: "Rejected", count: getStatusCount("Rejected") },
    { name: "Solved", count: getStatusCount("Solved") },
  ];

  const pieData = [
    { name: "Verified", value: getStatusCount("Accepted") },
    { name: "Pending", value: getStatusCount("Pending") },
    { name: "Rejected", value: getStatusCount("Rejected") },
    { name: "Solved", value: getStatusCount("Solved") },
  ];

  useEffect(() => {
    const fetchAllComplaints = async () => {
      try {
        const res = await viewAllComplaint();
        const data = res?.data?.data || [];

        if (res.status === 200) {
          setComplaints(data);

          const now = new Date();
          const currentMonth = now.getMonth();
          const currentYear = now.getFullYear();

          const thisMonthComplaints = data.filter((item) => {
            const createdAt = new Date(item.createdAt);
            return (
              createdAt.getMonth() === currentMonth &&
              createdAt.getFullYear() === currentYear
            );
          });

          setThisMonth(thisMonthComplaints);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllComplaints();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <h1 className="text-xl font-semibold">Loading dashboard...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex-1 p-3 md:p-10 bg-blue-50 rounded-lg">
      <h1 className="text-2xl font-semibold mb-6">Welcome, Admin</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <Card
          icon={faCalendarDays}
          title="This Month"
          value={thisMonth.length}
        />
        <Card
          icon={faCircleCheck}
          title="Verified Cases"
          value={getStatusCount("Accepted")}
        />
        <Card
          icon={faClock}
          title="Pending"
          value={getStatusCount("Pending")}
        />
        <Card
          icon={faThumbsDown}
          title="Rejected"
          value={getStatusCount("Rejected")}
        />
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 p-3">
        <div className="w-full h-96 p-5 bg-white rounded-lg shadow-md text-lg font-medium">
          Complaint Progress
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#3182CE" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full h-96 p-5 bg-white rounded-lg shadow-md text-lg font-medium">
          Complaint Distribution
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                label
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

const Card = ({ icon, title, value }) => (
  <div className="p-5 bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
    <FontAwesomeIcon size="2x" className="mb-2 text-blue-500" icon={icon} />
    <h2 className="text-lg font-medium">{title}</h2>
    <h1 className="text-lg font-bold">{value}</h1>
  </div>
);

export default AdminDashboard;
