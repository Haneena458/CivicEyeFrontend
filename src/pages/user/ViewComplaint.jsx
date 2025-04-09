import React, { useEffect, useState } from "react";
import { viewComplaint, updateComplaint } from "../../api/api";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { div } from "framer-motion/client";

function ViewComplaint() {
  const [complaintDetails, setComplaintDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const idParams = searchParams.get("id");
  const user = localStorage.getItem("name");

  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!idParams) {
      setLoading(false);
      return;
    }

    const fetchComplaint = async () => {
      try {
        const res = await viewComplaint(idParams);

        if (res.status === 200) {
          const data = res.data.data;

          setComplaintDetails(data);
          setStatus(data.status);

          const proof = data.proof;
          if (proof) {
            const fileExtension = proof.split(".").pop().toLowerCase();
            console.log(fileExtension);

            if (["mp4", "webm", "ogg"].includes(fileExtension)) {
              setMediaType("video");
            } else {
              setMediaType("image");
            }
            setMedia(
              proof.startsWith("http") ? proof : `http://localhost:5000${proof}`
            );
          }
        } else {
          alert("Error fetching complaint details");
        }
      } catch (error) {
        console.error("Error fetching complaints:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [idParams]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      console.log(`Updating complaint ${id} to ${newStatus}`);

      const response = await updateComplaint(id, { status: newStatus });

      if (response.status === 200) {
        console.log("Status updated successfully:", response.data);

        setComplaintDetails((prevDetails) => ({
          ...prevDetails,
          status: newStatus,
        }));

        setStatus(newStatus);
      } else {
        console.error("Error updating status:", response);
        alert("Failed to update complaint status.");
      }
    } catch (error) {
      console.error("Error updating complaint:", error);
      alert("An error occurred while updating the complaint.");
    }
  };

  const handleDownloadPDF = () => {
    if (!complaintDetails) return;

    const doc = new jsPDF();
    doc.setFont("helvetica");
    doc.setFontSize(19);

    doc.text("Complaint Details", 40, 40);
    doc.setFontSize(12);
    doc.text(`Complaint : ${complaintDetails.complaint}`, 20, 60);
    doc.text(`Type : ${complaintDetails.complaintType}`, 20, 70);
    doc.text(`Date : ${complaintDetails.date}`, 20, 80);
    doc.text(`Time : ${complaintDetails.time}`, 20, 90);
    doc.text(`District : ${complaintDetails.district}`, 120, 70);
    doc.text(`Location : ${complaintDetails.location}`, 120, 60);
    doc.text(`Status : ${complaintDetails.status}`, 120, 80);

    if (complaintDetails.proof === "image" && media) {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = media;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        const imgData = canvas.toDataURL("image/jpeg", 1.0);
        doc.addImage(imgData, "JPEG", 20, 120, 160, 100);
        doc.save(`Complaint_${complaintDetails._id}.pdf`);
      };

      img.onerror = () => {
        alert("Failed to load image for PDF.");
      };
    } else {
      doc.save(`Complaint_${complaintDetails._id}.pdf`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!complaintDetails) return <div>No complaint details available.</div>;

  return (
    <div className="min-h-screen w-full flex justify-center items-center text-center">
      <div className="w-lg md:w-auto bg-white shadow-lg rounded-2xl p-6 md:p-16">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Complaint Details
        </h2>
        <div className="text-left">
          <div className="w-full mb-6 justify-items-center">
            {mediaType === "image" && (
              <div className=" overflow-hidden  ">
                <img
                  src={media}
                  alt="Complaint Proof"
                  className=" h-auto object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>
            )}

            {mediaType === "video" && (
              <div className=" overflow-hidden ">
                <video
                  controls
                  className="w-fit h-auto rounded-lg"
                  preload="metadata"
                >
                  <source src={media} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 mb-5 md:space-y-2">
            <div>
              <p>
                <strong>Complaint : </strong> {complaintDetails.complaint}
              </p>
              <p>
                <strong>Complaint Type : </strong>{" "}
                {complaintDetails.complaintType}
              </p>
              <p>
                <strong>Date : </strong> {complaintDetails.date}
              </p>
              <p>
                <strong>Time : </strong> {complaintDetails.time}
              </p>
            </div>
            <div>
              <p>
                <strong>District : </strong> {complaintDetails.district}
              </p>
              <p>
                <strong>Location : </strong> {complaintDetails.location}
              </p>

              <p>
                <strong className="text-black">Status : </strong>{" "}
                <span
                className={`text-lg ${
                  complaintDetails.status === "Accepted"
                    ? "text-green-500"
                    : complaintDetails.status === "Rejected"
                    ? "text-red-500"
                    : complaintDetails.status === "Solved"
                    ? "text-blue-500"
                    : "text-orange-500"
                }`}
                >
                  {" "}
                  {status}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-evenly items-center">
          {status === "Pending" && user === "jane" && (
            <div className="flex gap-15">
              <div>
                <button
                  onClick={() =>
                    handleStatusUpdate(complaintDetails._id, "Accepted")
                  }
                  className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition-all"
                >
                  Accept
                </button>
              </div>

              <div>
                <button
                  onClick={() =>
                    handleStatusUpdate(complaintDetails._id, "Rejected")
                  }
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-all"
                >
                  Reject
                </button>
              </div>
            </div>
          )}

          {status === "Accepted" &&  (
            <div className="flex gap-10">
              {" "}
              <div>
                { user === "jane" &&   <button
                  onClick={() =>
                    handleStatusUpdate(complaintDetails._id, "Solved")
                  }
                  className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition-all"
                >
                  Solved
                </button> } 
              
              </div>
              <button
                onClick={handleDownloadPDF}
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition-all "
              >
                Download PDF
              </button>
            </div>
          )}

          <button
            onClick={() => navigate(-1)}
            className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600 transition-all "
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewComplaint;
