import React, { useState } from "react";
import toast from "react-hot-toast";
import { userRegistration } from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    DOB: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(form.phoneNumber.length !== 10){
      toast.error("phone number must contain 10 characters")
      return
    }

    if(form.password.length !== 8){
      toast.error("password must contain 8 character")
      return
    }
   
    if (form.password !== form.confirmPassword) {
      toast.error("password and confirm password do not match");
      return;
    }
 
    try {
      const res = await userRegistration(form);
      console.log("res", res);

      if (res.status === 201) {
        toast.success("registered successfully");
        navigate("/");
        return;
      }
      if (res.status === 400) {
        toast.error("all fields are required");
        return;
      }
      if (res.status === 422) {
        toast.error("invalid email format");
        return;
      }
      if (res?.status === 409) {
        toast.error("email already exist");
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
    console.log(form);
  };
  return (
    <div>
      <div className="p-10 w-full min-h-screen flex  justify-center items-center ">
        <div className="flex border border-gray-400 p-14 shadow-lg rounded-lg">
          <div className="w-1/2 text-center border-r border-gray-300 pr-5">
            <img src={logo} alt="CivicEye Logo" className="mx-auto mb-4" />
            <p className="text-xl font-semibold">Welcome to CivicEye!</p> <br />
            <p className="text-lg text-gray-600">
              Your platform to report,track,and resolve public issues with ease.
            </p>
          </div>
          <div className="w-1/2   text-center pl-5 pt-5">
            <h1 className="text-2xl font-bold mb-4">
              SIGN <span className="text-blue-400">IN</span>
            </h1>
            <div className="flex justify-items-center md:justify-center items-center ">
              <form action="">
                <input
                  type="text"
                  name="name"
                  id=""
                  value={form.name}
                  onChange={handleChange}
                  placeholder="enter full name"
                  className="border border-gray-500 rounded block p-1 ps-3  mb-2"
                />
                <input
                  type="text"
                  name="phoneNumber"
                  id=""
                  value={form.phoneNumber}
                  onChange={handleChange}
                  placeholder="enter phone number"
                  className="border border-gray-500 rounded block p-1 ps-3  mb-2"
                />
                <input
                  type="date"
                  name="DOB"
                  id=""
                  value={form.DOB}
                  onChange={handleChange}
                  placeholder="enter Date of Birth"
                  className="border border-gray-500 rounded block  p-1 ps-3 mb-2"
                />
                <input
                  type="email"
                  name="email"
                  id=""
                  value={form.email}
                  onChange={handleChange}
                  placeholder="enter email"
                  className="border border-gray-500 rounded block  p-1 ps-3 mb-2"
                />
                <input
                  type="password"
                  name="password"
                  id=""
                  value={form.password}
                  onChange={handleChange}
                  placeholder="enter 8 digit password"
                  className="border border-gray-500 rounded block  p-1 ps-3 mb-2"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  id=""
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="enter confirm password"
                  className="border border-gray-500 rounded block  p-1 ps-3 mb-2"
                />
              </form>
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded w-52 p-1"
              onClick={handleSubmit}
            >
              SIGN UP
            </button>
            <p className="mt-3 text-sm">
              Do you have an account?{" "}
              <Link
                className="text-blue-500 hover:text-blue-600 font-semibold"
                to={"/"}
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Signup;
