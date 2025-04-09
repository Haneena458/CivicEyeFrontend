import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { updateUser, viewUser } from "../api/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    DOB: "",
    password: "",
    state: "",
    address: "",
    idProof: "",
    idNumber: "",
  });
  const id = localStorage.getItem("id");
  const navigate = useNavigate();

  console.log(id);

  const [initialData, setInitialData] = useState(null);

  const idProof = ["Aadhaar", "License", "Identity Card", "SSLC"];
  const states = [
    "Thiruvananthapuram",
    "Kollam",
    "Pathanam thitta",
    "Alapuzha",
    "Kottayam",
    "Idukki",
    "Eranakulam ",
    "Thrissur",
    "Palakkad",
    "Malappuram",
    "Kozhikode",
    "Wayanad",
    "Kannur",
    "Kasarcode",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      return;
    }
    try {
      const res = await updateUser(id, formData);
      if (res.status === 200) {
        toast.success("profile updated successfully");
        setFormData("");
        navigate("/home");
        return;
      }
      if (res.status === 400) {
        toast.error("fields required");
      }
      if (res.status === 500) {
        toast.error("profile can't update");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = async () => {
    if (initialData) {
      setInitialData(initialData);
    } else {
      setFormData({
        phoneNumber: "",

        DOB: "",
        password: "",
        state: "",
        address: "",
        idProof: "",
        idNumber: "",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        return;
      }

      try {
        const res = await viewUser(id);
        setFormData(res?.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      fetchData();
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="flex justify-center mb-5">
          <img src={logo} alt="civicEye" width={100} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="border border-gray-300 rounded p-2"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name..."
            disabled
          />
          <input
            className="border border-gray-300 rounded p-2"
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter Phone Number..."
          />
          <input
            className="border border-gray-300 rounded p-2"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email..."
            disabled
          />
          <input
            className="border border-gray-300 rounded p-2"
            type="date"
            name="DOB"
            value={formData.DOB}
            onChange={handleChange}
          />
          <select
            name="state"
            className="border border-gray-300 rounded p-2"
            value={formData.state}
            onChange={handleChange}
          >
            <option value="">Choose State...</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 col-span-2"
            placeholder="Enter Address..."
          ></textarea>
          <select
            name="idProof"
            className="border border-gray-300 rounded p-2"
            value={formData.idProof}
            onChange={handleChange}
          >
            <option value="">Choose ID Proof...</option>
            {idProof.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2"
            placeholder="Enter ID Number..."
          />
        </div>
        <div className="flex justify-end gap-6 mt-6">
          <button
            type="reset"
            onClick={handleReset}
            className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
