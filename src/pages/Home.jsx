import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCheck,
  faMedal,
  faSquarePollVertical,
  faUsersSlash,
  faTrash,
  faTriangleExclamation,
  faEllipsis,
  faCarBurst,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import bg from "../assets/bg.png";
import call from "../assets/civicEyeCall.avif";
import mail from "../assets/civicEyeMail.avif";
import Card from "../component/Card";
import Navbar from "../component/Navbar";
import Feedback from "../component/Feedback";
import { viewAllComplaint } from "../api/api";

function Home() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getStatusCount = (status) =>
    complaints.filter((item) => item.status === status).length;

  const handleCategoryClick = (category) => {
    navigate(`/complaint/${category}`);
  };

  const categories = [
    { name: "Waste Dumping", icon: <FontAwesomeIcon icon={faTrash} /> },
    {
      name: "Public Nuisance",
      icon: <FontAwesomeIcon icon={faTriangleExclamation} />,
    },
    { name: "Traffic Violation", icon: <FontAwesomeIcon icon={faCarBurst} /> },
    { name: "Other..", icon: <FontAwesomeIcon icon={faEllipsis} /> },
  ];

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await viewAllComplaint();
        if (res.status === 200) {
          setComplaints(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch complaints:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="p-2 max-w-full min-h-screen bg-gray-50">
      <Navbar />

      <div>
        <img src={bg} alt="Civic Eye Banner" className="w-full h-29 md:h-46" />
        <div className="bg-black max-w-screen h-70 md:h-60 text-white text-center text-4xl font-serif font-semibold pt-16">
          <h1 className="p-1">Make Your Voice Heard!</h1>
          <h1 className="p-1">Report Problems, Help Your City,</h1>
          <h1>and Earn Rewards!</h1>
        </div>
      </div>

      <div className="p-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="justify-items-center"
        >
          <h2 className="text-2xl text-center font-bold mb-6">
            Select a Complaint Type
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-5">
            {categories.map(({ name, icon }) => (
              <motion.div
                key={name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-60 text-center p-4 border-0 shadow-xl text-black font-semibold rounded-lg cursor-pointer hover:bg-gray-200 transition"
                onClick={() => handleCategoryClick(name)}
              >
                {icon}
                <span className="block mt-2" title={name}>
                  {name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="p-16">
        <h1 className="text-4xl font-semibold text-center p-5">
          Complaint Reports
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-5 bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
            <FontAwesomeIcon size="xl" icon={faSquareCheck} />
            <h3 className="p-1 font-semibold">Complaints Registered</h3>
            <h1 className="font-bold text-2xl">{loading ? "..." : complaints.length}</h1>
          </div>
          <div className="p-5 bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
            <FontAwesomeIcon size="lg" icon={faUsersSlash} />
            <h3 className="p-1 font-semibold">Reports Failed</h3>
            <h1 className="font-bold text-2xl">{loading ? "..." : getStatusCount("Rejected")}</h1>
          </div>
          <div className="p-5 bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
            <FontAwesomeIcon size="xl" icon={faMedal} />
            <h3 className="p-1 font-semibold">Rewards Distributed</h3>
            <h1 className="font-bold text-xl">{getStatusCount("Accepted") || "comimg soon"}</h1>
          </div>
          <div className="p-5 bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
            <FontAwesomeIcon size="xl" icon={faSquarePollVertical} />
            <h3 className="p-1 font-semibold">Impact Made</h3>
            <h1 className="font-bold text-xl">Coming Soon</h1>
          </div>
        </div>
      </div>

      <div className="p-16">
        <h2 className="text-2xl font-bold text-center mb-12">What We Do</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            "You Register the Complaint",
            "Our Team Verifies the Complaint and shares it with the responsible authorities",
            "The responsible authorities process the complaint.",
            "Your Incentive is provided once the complaint is processed",
          ].map((text, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.3 }}
              className="border-2 border-blue-300 rounded-lg flex justify-center items-center p-4 text-center"
            >
              <h4>{text}</h4>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="p-8">
        <div className="p-8 text-center rounded-lg shadow">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            What Our Users Say
          </h2>

          <div className="max-w-3xl mx-auto">
            <Card />
          </div>

          <div className="p-5 mt-lg-5">
            <Feedback />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="bg-white grid grid-cols-2 shadow-md rounded-lg text-center">
            <div>
              <img src={mail} alt="Support Mail" className="w-56 h-42 p-2" />
            </div>
            <div>
              <div className="text-3xl">✉️</div>
              <h3 className="font-bold text-lg mt-2">Support Mail</h3>
              <p className="text-gray-600 mt-1">
                For any assistance or inquiries, reach out to us.
              </p>
              <a
                href="mailto:support@civiceye.com"
                className="text-blue-500 font-bold"
              >
                support@civiceye.com
              </a>
            </div>
          </div>

          <div className="bg-white grid grid-cols-2 shadow-md rounded-lg text-center">
            <div>
              <img src={call} alt="Support Call" className="w-56 h-42 p-2" />
            </div>
            <div>
              <div className="text-3xl">📞</div>
              <h3 className="font-bold text-lg mt-2">Make A Call</h3>
              <p className="text-gray-600 mt-1">
                Need immediate assistance? Call us.
              </p>
              <a href="tel:+1234567890" className="text-blue-500 font-bold">
                +123 456 7890
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-black text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 p-6">
          <div className="p-5 text-center">
            <h1 className="border-l-4 border-l-blue-400 pl-5 text-lg font-semibold mb-4">
              Phone Numbers
            </h1>
            <div className="space-y-2">
              <p>Military</p>
              <p className="text-gray-300">(123) 456-6780</p>
              <p className="text-gray-300">(123) 456-8780</p>
              <p>State Police</p>
              <p className="text-gray-300">(123) 456-6781</p>
              <p>Fire Department</p>
              <p className="text-gray-300">(123) 456-6782</p>
            </div>
          </div>

          <div className="p-5 text-center">
            <h1 className="border-l-4 border-blue-400 pl-5 text-lg font-semibold mb-4">
              Contact Info
            </h1>
            <p className="text-gray-300 font-medium">Softroniics</p>
            <p className="text-gray-300 mt-1">(+12) 34-56789</p>
            <p className="text-gray-300 mt-1">Softroniics@gmail.com</p>
          </div>

          <div className="p-5 text-center">
            <h1 className="border-l-4 border-l-blue-400 pl-5 mb-4">
              Quick links
            </h1>
            <ul className="space-y-2">
              <li>
                <Link to={"/home"} className="text-gray-300 hover:text-blue-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to={"/myComplaint"} className="text-gray-300 hover:text-blue-300">
                  Complaints
                </Link>
              </li>
              <li>
                <Link to={"/register"} className="text-gray-300 hover:text-blue-300">
                  Register
                </Link>
              </li>
              <li>
                <Link to={"/"} className="text-gray-300 hover:text-blue-300">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <h1 className="text-center text-gray-400 text-sm py-4">
          © CivicEye 2025 | Empowering Citizens, Improving Communities.
        </h1>
      </footer>
    </div>
  );
}

export default Home;
