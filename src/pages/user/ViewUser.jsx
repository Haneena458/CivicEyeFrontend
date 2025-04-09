import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import { updateComplaint, viewComplaint } from "../../api/api";

function ViewUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComplaint = async () => {
      if (!id) return;
      try {
        const response = await viewComplaint(id);

        if (response.status === 200) {
          setComplaint(response.data.data);
          const proof = response.data.data.proof;
          if (proof) {
            const fileExtension = proof.split(".").pop().toLowerCase();
            if (["mp4", "webm", "ogg"].includes(fileExtension)) {
              setMediaType("video");
            } else {
              setMediaType("image");
            }
            setMedia(`http://localhost:5000${proof}`);
          }
          setStatus(response.data.data.status);
        } else {
          alert("Error fetching complaint details");
        }
      } catch (error) {
        console.error("Error fetching complaint:", error);
      }
    };
    fetchComplaint();
  }, [id]);

  const handleStatusUpdate = async (newStatus) => {
    setLoading(true);
    try {
      const response = await updateComplaint(id, newStatus);
      if (response.status === 200) {
        setStatus(newStatus);
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!complaint) return;

    const doc = new jsPDF();

    let y = 20;
    const logo = new Image();
    logo.src = "/src/assets/Logo.png";

    logo.onload = function () {
      doc.addImage(logo, "PNG", 85, y, 40, 8);
      y += 25;
      addComplaintDetails();
    };

    function addComplaintDetails() {
      if (media && mediaType === "image") {
        const proofImg = new Image();
        proofImg.src = media;
        proofImg.crossOrigin = "Anonymous";

        proofImg.onload = function () {
          doc.addImage(proofImg, "JPEG", 55, y, 100, 60); // Centered image
          y += 80;
          addHeading();
        };
      } else {
        addHeading();
      }
    }

    function addHeading() {
      doc.setFontSize(15);
      doc.setFont("helvetica", "bold");
      doc.text("Complaint Details", 105, y, { align: "center" });
      y += 20; // Add some space below the heading before adding text
      addTextContent();
    }

    function addTextContent() {
      const lineSpacing = 12;

      const addText = (label, value) => {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(`${label}:`, 55, y);
        doc.setFont("helvetica", "normal");
        doc.text(value, 140, y, { align: "center" });
        y += lineSpacing;
      };

      addText("Date", complaint.date || "N/A");
      addText("Name", complaint.complaintName || "N/A");
      addText("Description", complaint.description || "N/A");
      addText("District", complaint.district || "N/A");
      addText("Location", complaint.location || "N/A");
      addText("Uploader", complaint.createdBy || "N/A");
      addText("Type", complaint.type || "N/A");

      const formattedAddress = complaint.address
        ? complaint.address.replace(/, /g, "\n")
        : "N/A";
      addText("Address", formattedAddress);

      addText(
        "MobileNumber",
        complaint.mobileNumber ? String(complaint.mobileNumber) : "N/A"
      );

      addText("Status", status || "N/A");

      // Save the PDF
      doc.save(`Complaint_${complaint.complaintName}.pdf`);
    }
  };

  if (!complaint) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Under Investigation":
        return "text-green-500 ";
      case "Rejected":
        return "text-red-500";
      case "Pending":
        return "text-yellow-500";
      case "Complaint Solved":
        return "text-blue-500";
      default:
        return "text-gray-300";
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200 mt-20">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Complaint Details
      </h2>

      {media && (
        <div className="flex justify-center items-center mb-6">
          {mediaType === "image" ? (
            <img
              src={media}
              alt="Proof"
              className="w-full max-w-lg rounded-lg shadow-md"
            />
          ) : (
            <video controls className="w-full max-w-lg rounded-lg shadow-md">
              <source src={media} type={`video/${media.split(".").pop()}`} />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
        <p>
          <strong className="text-gray-700">Date:</strong> {complaint.date}
        </p>
        <p>
          <strong className="text-gray-700">Name:</strong>{" "}
          {complaint.complaintName}
        </p>
        <p>
          <strong className="text-gray-700">Description:</strong>{" "}
          {complaint.description}
        </p>
        <p>
          <strong className="text-gray-700">District:</strong>{" "}
          {complaint.district}
        </p>
        <p>
          <strong className="text-gray-700">Location:</strong>{" "}
          {complaint.location}
        </p>
        <p>
          <strong className="text-gray-700">Uploader:</strong>{" "}
          {complaint.createdBy}
        </p>
        <p>
          <strong className="text-gray-700">Type:</strong> {complaint.type}
        </p>
        <p className={`text-lg font-normal  ${getStatusColor(status)}`}>
          <strong className="text-gray-700">Status:</strong> {status}
        </p>
      </div>

      <div className="flex justify-center space-x-4 mt-6">
        {status === "Pending" && (
          <>
            <button
              className="px-5 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 disabled:bg-gray-400"
              onClick={() => handleStatusUpdate("Under Investigation")}
              disabled={loading}
            >
              {loading ? "Updating..." : "Accept"}
            </button>
            <button
              className="px-5 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 disabled:bg-gray-400"
              onClick={() => handleStatusUpdate("Rejected")}
              disabled={loading}
            >
              {loading ? "Updating..." : "Reject"}
            </button>
          </>
        )}
        {status === "Under Investigation" && (
          <button
            className="px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-400"
            onClick={() => handleStatusUpdate("Complaint Solved")}
            disabled={loading}
          >
            {loading ? "Updating..." : "Complaint Solved"}
          </button>
        )}

        {/* Back and Download buttons - always visible */}
        <button
          className="px-5 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <button
          className="px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default ViewUser;
