import React, { useState, useEffect } from "react";
import { createComplaint } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function RegisterComplaint() {
  const { category } = useParams();
  const id = localStorage.getItem("id");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    complaint: category,
    complaintType: "",
    description: "",
    district: "",
    location: "",
    date: "",
    time: "",
    createdBy: id,
  });

  const [proof, setProof] = useState(null);

  useEffect(() => {
    const now = new Date();
    setFormData((prev) => ({
      ...prev,
      date: now.toISOString().split("T")[0],
      time: now.toTimeString().split(":").slice(0, 2).join(":"),
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setProof(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.complaintType || !formData.location || !formData.date || !formData.time || !formData.district) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!proof) {
      toast.error("Please upload proof (image or video)");
      return;
    }

    const formDatas = new FormData();
    for (let key in formData) {
      formDatas.append(key, formData[key]);
    }
    formDatas.append("proof", proof);

    try {
      const res = await createComplaint(formDatas);

      if (res.status === 201) {
        toast.success("Complaint submitted successfully!");
        navigate("/home");
      } else {
        toast.error(res.data?.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      toast.error("Submission failed");
    }
  };

  const typeOptions = {
    "Waste Dumping": ["Household Waste disposal", "Industrial & commercial Waste", "Medical Waste disposal", "Plastic Waste disposal", "E-Waste disposal", "Hazardous Waste disposal", "Agricultural Waste disposal", "Construction and Demolition Waste", "Radioactive Waste disposal", "Mining Waste disposal", "Sewage and Sludge Waste", "Oil and Chemical Waste", "Textile Waste disposal", "Food Waste disposal", "Marine Waste disposal", "Airborne Waste disposal"],
    "Public Nuisance": ["Public intoxication or drug use", "Noise Pollution", "Air Pollution", "Water Pollution", "Vandalism", "Encroachment", "Illegal Construction", "Littering", "Traffic Congestion", "Unauthorized Street Vendors", "Open Defecation", "Illegal Dumping", "Public smoking in non-smoking zones", "Obstruction of Public Pathways", "Light Pollution", "Uncontrolled Pet Waste", "Public Drunkenness", "Graffiti", "Unauthorized Protests or Gatherings"],
    "Traffic Violation": ["Over Speeding", "Driving Without a License", "Not Wearing a Seatbelt", "Not Wearing a Helmet", "Signal Jumping", "Wrong Parking", "Rash Driving", "Drunk Driving", "Using Mobile While Driving", "Driving Without Insurance", "Violating Lane Discipline", "Overloading Vehicles", "Driving on the Wrong Side", "Blocking Emergency Vehicles", "Hit and Run", "Tailgating", "Ignoring Pedestrian Crossings", "Driving Without Headlights at Night", "Illegal U-Turns", "Failure to Yield Right of Way"],
    "Other..": ["Unauthorized construction", "Water wastage or pipeline leakage", "Streetlight malfunction", "Potholes and road damage", "Unhygienic food handling by vendors", "Drainage blockage and flooding", "Unauthorized hoardings and advertisements", "Misuse of public property", "Cybercrime and online fraud", "other"],
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white p-6 md:p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-700 text-center mb-6">
          Submit a Complaint
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Complaint Name</label>
            <input
              name="complaint"
              type="text"
              value={category}
              readOnly
              className="w-full px-3 py-2 rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-semibold">Complaint Type <span className="text-red-500">*</span></label>
            {typeOptions[formData.complaint] ? (
              <select
                name="complaintType"
                value={formData.complaintType}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select complaint Type</option>
                {typeOptions[formData.complaint].map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                name="complaintType"
                value={formData.complaintType}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            )}
          </div>

          <div>
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <input type="text" name="district" value={formData.district} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" placeholder="District" />

          <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" placeholder="Location *" required />

          <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" required />

          <input type="time" name="time" value={formData.time} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" required />

          <div>
            <label className="block font-medium">Upload File</label>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {proof && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Preview:</h3>
              {proof.type.startsWith("image/") ? (
                <img src={URL.createObjectURL(proof)} alt="preview" className="w-full mt-2 rounded-md shadow-md" />
              ) : (
                <video controls className="w-full mt-2 rounded-md shadow-md">
                  <source src={URL.createObjectURL(proof)} type={proof.type} />
                </video>
              )}
            </div>
          )}

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterComplaint;
