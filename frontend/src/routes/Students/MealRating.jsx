import React, { useEffect, useState } from "react";
import MealCard from "../../components/StudentComponents/MealCard";
import axios from "axios";
import { getAccessToken } from "../../components/Authentication/RefreshToken";
const API_URL = import.meta.env.VITE_API_URL;

const meals = [
  { name: "Breakfast", description: "Start your day with a nutritious breakfast", time: "7:00 - 9:00 AM", availableAfter: "09:00", borderColor: "border-orange-400" },
  { name: "Lunch", description: "Enjoy a hearty lunch in the afternoon", time: "12:30 - 2:00 PM", availableAfter: "14:00", borderColor: "border-red-400" },
  { name: "Snacks", description: "Take a break with evening snacks", time: "5:00 - 6:30 PM", availableAfter: "18:30", borderColor: "border-pink-400" },
  { name: "Dinner", description: "End your day with a satisfying dinner", time: "7:45 - 9:00 PM", availableAfter: "21:00", borderColor: "border-purple-400" },
];

function formatDate(date) {
  return date.toLocaleDateString("en-CA");
}

export default function MealRatingHub() {
  const [stuId, setStuId] = useState('');
  const [college, setCollege] = useState('');
  const [hostel, setHostel] = useState('');
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [ratings, setRatings] = useState({});
  const today = formatDate(new Date());

  useEffect(() => {
    const fetchStudentInfoAndRatings = async () => {
      const result = await getAccessToken();
      if (!result.token) {
        alert("Session expired! Login again to continue");
        window.location.href = "/login";
        return;
      }
      try {
        const res = await fetch(`${API_URL}/auth/get-info/`, {
          headers: { Authorization: `Bearer ${result.token}` },
        });
        const data = await res.json();

        if (res.ok) {
          setStuId(data.id);
          setCollege(data.college);
          setHostel(data.hostel);
          // Now fetch ratings immediately after student info is set
          const ratingRes = await axios.get(`${API_URL}/user/mess/meal-ratings?date=${selectedDate}&studentId=${data.id}`, {
            headers: { Authorization: `Bearer ${result.token}` },
          });

          const ratingsMap = {};
          ratingRes.data.forEach(r => ratingsMap[r.mealType] = r.rating);
          setRatings(ratingsMap);
        }
      } catch (err) {
        console.error("Error fetching student info or ratings", err);
      }
    };

    fetchStudentInfoAndRatings();
  }, [selectedDate]); // refetch on date change

  const handleSubmitRating = async (mealType, value) => {
    try {
      await axios.post(`${API_URL}/user/mess/create-meal-ratings`, {
        studentId: stuId,
        college,
        hostel,
        date: selectedDate,
        mealType: mealType.toLowerCase(),
        rating: value,
      }, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("accessToken")}` },
      });
      // Optimistically update local rating UI
      setRatings((prev) => ({ ...prev, [mealType]: value }));
    } catch (err) {
      console.error("Failed to submit rating", err);
    }
  };

  return (
      <div className="bg-stubgdark w-full h-full p-4 flex flex-col gap-y-5 overflow-auto scrollbar-thin scrollbar-webkit">
       <h1 className="text-dashtext py-2 flex justify-center text-2xl md:text-3xl font-bold">
         Meal Rating Hub
       </h1>

       {/* Date Section */}
       <div className="flex justify-center items-center mb-2 gap-3">
         <label className="text-md font-medium text-menusecondary">Select Date:</label>
         <input type="date" value={selectedDate}
           onChange={(e) => setSelectedDate(e.target.value)}
           className="bg-black text-white border border-gray-600 rounded px-2 py-1
           focus:outline-none focus:ring-2 focus:ring-white 
           [&::-webkit-calendar-picker-indicator]:invert 
           [&::-webkit-calendar-picker-indicator]:cursor-pointer"/>
       </div>
      {/* Cards */}
      <div className="pb-4 px-[3%] lg:px-[7%] grid grid-cols-1 md:grid-cols-2 gap-6">
        {meals.map((meal) => (
          <MealCard
            key={meal.name}
            {...meal}
            selectedDate={selectedDate}
            isToday={selectedDate === today}
            existingRating={ratings[meal.name.toLowerCase()] || 0}
            onSubmitRating={handleSubmitRating} />
        ))}
      </div>
    </div>
  );
}