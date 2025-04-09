import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../api/api";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function LoginPage() {
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setloginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginData?.email || !loginData.password) {
      toast.error("email or password is missing");
      return;
    }
    try {
      const res = await userLogin(loginData);
      console.log(res);
      

      if (res?.status === 201) {
        const userName = res?.data.userName;
        const token = res?.data.token;
        const userId = res?.data.id;
        localStorage.setItem("id", userId);
        localStorage.setItem("token", token);
        localStorage.setItem("name", userName);

        toast.success(`${userName}!!  login succesfully`);
        if (res?.data.type === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }

        return;
      }

      if (res?.status === 400) {
        toast.error("all fields are required");
        return;
      }

      if (res?.status === 404) {
        toast.error("you are not registered");
        return;
      }

      if (res?.status === 401) {
        alert("njh")
        toast.error("password do not match");
        return;
      }

      if (res?.status === 500) {
        toast.error("server error");
        return;
      }

    } catch (error) {
      return error;
    }
  };

  return (
    <div className="p-4 md:p-10 w-full min-h-screen flex justify-center items-center ">
    <div className="flex flex-col md:flex-row w-full max-w-4xl border border-gray-400 shadow-lg rounded-lg overflow-hidden  md:p-16">
      
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-r border-gray-400 p-6">
        <img src={logo} alt="CivicEye Logo" className="mb-4 w-24 md:w-32" />
        <p className="text-xl font-semibold">Welcome to CivicEye!</p>
        <p className="text-lg text-gray-600 mt-2">
          Your platform to report, track, and resolve public issues with ease.
        </p>
      </div>
  
      <div className="w-full md:w-1/2 text-center p-6">
        <h1 className="text-2xl font-bold mb-4">
          SIGN <span className="text-blue-400">IN</span>
        </h1>
  
        <div className="flex flex-col items-center">
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 w-full max-w-xs mb-3"
            placeholder="Enter your email"
          />
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 w-full max-w-xs mb-3"
            placeholder="Enter your password"
          />
        </div>
  
      <div className="flex justify-end pe-5">
      <Link
          className="text-blue-500 hover:text-blue-600 font-semibold text-sm block mb-2"
          to={"/password"}
        >
          Forgot Password ?
        </Link>
      </div>
  
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded w-full max-w-xs py-2"
        >
          SIGN IN
        </button>
  
        <p className="mt-4 text-sm">
          Don't have an account?{" "}
          <Link
            className="text-blue-500 hover:text-blue-600 font-semibold"
            to={"/signup"}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  </div>
  
  );
}

export default LoginPage;
