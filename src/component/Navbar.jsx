import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLayout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    navigate("/");
  };
  return (
    <div>
      <nav className="relative flex flex-wrap p-2  justify-between items-center md:justify-between shadow-xl">
        <img src={logo} alt="civicEye" className="p-2 w-24" />
        <div className="flex  gap-6">
          <Link to={"/home"} className="pr-10">
            Home
          </Link>
          <Link to={"/myComplaint"}>My Complaints</Link>
          <Link to={"/about"} className="pr-10 pl-10">
            About
          </Link>
          <Link to={"/contact"}>Contact</Link>
        </div>
        <div
          className="w-16 h-10 rounded-lg flex justify-center items-center bg-gray-200 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FontAwesomeIcon
            icon={faCircleUser}
            size="xl"
            className="text-blue-400 pr-1"
          />
          <FontAwesomeIcon icon={faAngleDown} className="text-blue-400" />
        </div>
        {isOpen && (
          <div className="absolute right-0 top-12 mt-2 w-32 bg-white shadow-lg rounded-lg">
            <ul className="py-2 flex flex-col">
              <Link
                to={"/profile"}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Profile
              </Link>
              <button
                onClick={handleLayout}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </button>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
