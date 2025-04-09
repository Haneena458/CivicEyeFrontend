import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createEnquiry, viewReplyEnquiry } from "../api/api";

function Contact() {
  const id = localStorage.getItem("id");

  const [enquiryForm, setEnquiryForm] = useState({
    name: "",
    email: "",
    message: "",
    enquiredBy: id,
  });

  const [replies, setReplies] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnquiryForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { name, email, message } = enquiryForm;
      if (!name || !email || !message) {
        toast.error("All fields are required.");
        return;
      }

      const res = await createEnquiry(enquiryForm);
      if (res.status === 201) {
        toast.success("Enquiry submitted successfully!");
        setEnquiryForm({
          name: "",
          email: "",
          message: "",
          enquiredBy: id, 
        });

        fetchReplyEnquiry();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const fetchReplyEnquiry = async () => {
    try {
      const res = await viewReplyEnquiry();
      if (res.status === 200) {
        setReplies(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReplyEnquiry();
  }, []);

  const userReplies = replies?.filter((item) => item.enquiredBy === id);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {/* Enquiry Form */}
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-2xl mb-12">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Get in Touch
        </h1>
        <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="font-semibold block mb-2 text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={enquiryForm.name}
              onChange={handleChange}
              className="p-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="font-semibold block mb-2 text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={enquiryForm.email}
              onChange={handleChange}
              className="p-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="font-semibold block mb-2 text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              value={enquiryForm.message}
              onChange={handleChange}
              className="p-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Write your message here"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Replies Section */}
      <div className="w-full max-w-2xl">
        {userReplies?.length > 0 ? (
          <div className="bg-white shadow-xl rounded-3xl p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Your Enquiries
            </h2>
            {userReplies.map((item, index) => (
              <div
                key={index}
                className="mb-4 p-4 border rounded-lg bg-gray-50"
              >
                <p>
                  <strong>Message:</strong> {item.message}
                </p>
                <p>
                  <strong>Reply:</strong> {item.reply || "No reply yet"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            You haven't made any enquiries yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default Contact;
