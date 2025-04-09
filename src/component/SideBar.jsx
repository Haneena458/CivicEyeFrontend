import React from "react";
import logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faCommentAlt,
  faEnvelope,
  faPersonCircleQuestion,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";

function SideBar() {
  const location = useLocation();

  const menuItems = [
    { path: "/admin", label: "Dashboard", icon: faChartSimple },
    {
      path: "/admin/complaint",
      label: "Complaint",
      icon: faPersonCircleQuestion,
    },
    { path: "/admin/user", label: "User Management", icon: faUserAlt },
    { path: "/admin/feedback", label: "Feedback", icon: faCommentAlt },
    { path: "/admin/enquiry", label: "enquiry", icon: faEnvelope },
  ];

  return (
    <div className="p-4">
      <div className="w-48 m-10 ms-0">
        <img src={logo} alt="CivicEye logo" />
      </div>

      <div className="flex flex-col gap-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`font-semibold p-3 rounded-lg cursor-pointer flex items-center
            ${
              location.pathname === item.path
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-200"
            }
          `}
          >
            <FontAwesomeIcon className="pe-4" icon={item.icon} />
            {item.label}
          </Link>
        ))}
      </div>

      <button className="mt-8 md:absolute bottom-6 left-6 bg-blue-500 text-white py-2 px-4 rounded-lg">
        👨‍⚖️ Haneena
      </button>
    </div>

    // <div className="">
    //   <div className="w-48 m-10 ms-0">
    //     <img src={logo} alt="CivicEye logo" />
    //   </div>
    //   <div className="flex-none w-fit">
    //     <Link className="font-semibold p-3 hover:bg-blue-200 rounded-lg cursor-pointer" to={"/admin"}><FontAwesomeIcon className="pe-4 " icon={faChartSimple} />Admin Dashboard</Link><br /><br />
    //     <Link className="font-semibold p-3 hover:bg-blue-200 rounded-lg cursor-pointer" to={"/admin/complaint"}><FontAwesomeIcon className="pe-3 " icon={faPersonCircleQuestion} />Complaint</Link><br />
    //     <Link className="font-semibold p-3 hover:bg-blue-200 rounded-lg cursor-pointer" to={"/admin/user"}><FontAwesomeIcon className="pe-4 mt-6" icon={faUserAlt} />User Management</Link><br />
    //     <Link className="font-semibold p-3 hover:bg-blue-200 rounded-lg cursor-pointer" to={"/admin/feedback"}><FontAwesomeIcon className="pe-4 mt-6" icon={faCommentAlt} />Feedback</Link><br />
    //   </div>
    //   <button className=" mt-8 md:absolute bottom-6 left-6 bg-blue-500 text-white py-2 px-4 rounded-lg">
    //       👨‍⚖️ Haneena
    //     </button>
    // </div>
  );
}

export default SideBar;
