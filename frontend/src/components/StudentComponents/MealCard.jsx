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
    <div className={`border-t-[4px] border-[2px] ${borderColor} rounded-md p-4`}>
      <h3 className="text-lg text-ratemealprimary font-semibold">{name}</h3>
      <div className="flex items-center text-ratemealsecondary text-sm mt-1">
        <FaUtensils className="mr-1" />
        <span>{description}</span>
      </div>
      <div className="flex items-center text-ratemealsecondary text-sm mt-1">
        <FaClock className="mr-1" />
        <span>{time}</span>
      </div>

      <div className="mt-4">
        <p className="font-medium mb-1 text-ratemealsecondary">Rate this meal:</p>
        {!isToday ? (
          <div className="text-sm text-ratemealsecondary">Rating not available for this day.</div>
        ) : isAvailable ? (
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                onClick={() => handleRating(i)}
                className={`text-2xl cursor-pointer hover:scale-105 transition-transform ${i <= rating ? "text-yellow-400" : "text-white"}`}
              >
                {/* <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className={`${i <= rating ? "fill-yellow-400" : "fill-white"} stroke-1 stroke-dashtext`}><path d="m305-704 112-145q12-16 28.5-23.5T480-880q18 0 34.5 7.5T543-849l112 145 170 57q26 8 41 29.5t15 47.5q0 12-3.5 24T866-523L756-367l4 164q1 35-23 59t-56 24q-2 0-22-3l-179-50-179 50q-5 2-11 2.5t-11 .5q-32 0-56-24t-23-59l4-165L95-523q-8-11-11.5-23T80-570q0-25 14.5-46.5T135-647l170-57Zm49 69-194 64 124 179-4 191 200-55 200 56-4-192 124-177-194-66-126-165-126 165Zm126 135Z"/></svg> */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" className={`size-6 ${i <= rating ? "fill-yellow-400" : "fill-white"} stroke-1 stroke-yellow-400`}>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>

              </button>
            ))}
            {rating > 0 && <span className="flex items-center ml-2 text-sm text-ratemealsecondary">(Rated)</span>}
          </div>
        ) : (
          <div className="flex items-center justify-center bg-stubgcard text-ratemealsecondary rounded-md py-4 mt-2 cursor-pointer">
            <FaLock className="text-lg mr-2" />
            Rating available after {availableAfter}
          </div>
        )}
      </div>
    </div>
  );
}