import React, { useEffect, useState } from "react";
import { FaLock, FaUtensils, FaClock } from "react-icons/fa";

function isRatingAvailable(afterTime) {
  const now = new Date();
  const [hrs, mins] = afterTime.split(":").map(Number);
  const unlockTime = new Date();
  unlockTime.setHours(hrs, mins, 0, 0);
  return now >= unlockTime;
}

export default function MealCard({
  name,
  description,
  time,
  availableAfter,
  borderColor,
  selectedDate,
  isToday,
  existingRating,
  onSubmitRating,
}) {
  const [rating, setRating] = useState(existingRating || 0);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    const checkAvailability = () => setIsAvailable(isRatingAvailable(availableAfter));
    if (isToday) {
      checkAvailability();
      const interval = setInterval(checkAvailability, 60000);
      return () => clearInterval(interval);
    } else {
      setIsAvailable(false);
    }
  }, [availableAfter, isToday]);

  useEffect(() => {
    setRating(existingRating || 0);
  }, [existingRating]);

  const handleRating = (value) => {
    if (isAvailable && isToday) {
      setRating(value);
      onSubmitRating(name, value); // send meal name & rating
    }
  };

  return (
    <div className={`border-t-[3.5px] border-[1px] ${borderColor} rounded-md p-4`}>
      <h3 className="text-lg text-gray-200 font-semibold">{name}</h3>
      <div className="flex items-center text-gray-400 text-sm mt-1">
        <FaUtensils className="mr-1" />
        <span>{description}</span>
      </div>
      <div className="flex items-center text-gray-400 text-sm mt-1">
        <FaClock className="mr-1" />
        <span>{time}</span>
      </div>

      <div className="mt-4">
        <p className="font-medium mb-1 text-gray-400">Rate this meal:</p>
        {!isToday ? (
          <div className="text-sm text-gray-500">Rating not available for this day.</div>
        ) : isAvailable ? (
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                onClick={() => handleRating(i)}
                className={`text-2xl cursor-pointer hover:scale-105 transition-transform ${i <= rating ? "text-yellow-400" : "text-gray-300"}`}
              >
                ★
              </button>
            ))}
            {rating > 0 && <span className="flex items-center ml-2 text-sm text-gray-400">(Rated)</span>}
          </div>
        ) : (
          <div className="flex items-center justify-center bg-stubgcard text-gray-400 rounded-md py-4 mt-2 cursor-pointer">
            <FaLock className="text-lg mr-2" />
            Rating available after {availableAfter}
          </div>
        )}
      </div>
    </div>
  );
}