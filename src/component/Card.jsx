import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { viewAllFeedback } from "../api/api";

function Card() {
  const [feedbackCard, setFeedbackCard] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await viewAllFeedback();
        console.log("r",res);
        
        const acceptedFeedback =
          res?.data?.data?.filter((item) => item.status === "Accepted") || [];
        setFeedbackCard(acceptedFeedback);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFeedback();
  }, []);

  const prevSlide = () => {
    if (feedbackCard.length > 0) {
      setCurrentIndex((prev) =>
        prev === 0 ? feedbackCard.length - 1 : prev - 1
      );
    }
  };

  const nextSlide = () => {
    if (feedbackCard.length > 0) {
      setCurrentIndex((prev) =>
        prev === feedbackCard.length - 1 ? 0 : prev + 1
      );
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto relative">
      <div className="bg-white shadow-lg rounded-lg p-6 text-center">
        {feedbackCard.length > 0 ? (
          <>
            <p className="text-lg font-medium text-gray-800">
              "{feedbackCard[currentIndex]?.feedback}"
            </p>
            <p className="mt-2 text-sm text-gray-500">
              — {feedbackCard[currentIndex]?.createdBy?.name || "Anonymous"}
            </p>
          </>
        ) : (
          <p className="text-gray-500">No Feedback Available</p>
        )}
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {feedbackCard.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>

      {feedbackCard.length > 0 && (
        <>
          <button
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-gray-800/50 text-white p-2 rounded-full"
            onClick={prevSlide}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-800/50 text-white p-2 rounded-full"
            onClick={nextSlide}
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
    </div>
  );
}

export default Card;
