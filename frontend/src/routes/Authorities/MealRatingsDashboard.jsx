import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import MealBox from '../../components/Admin Components/MealBox';
import { getAccessToken } from '../../components/Authentication/RefreshToken';
const API_URL = import.meta.env.VITE_API_URL;

const MealRatingsDashboard = () => {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchInfoAndData = async () => {
      const result = await getAccessToken();
      if (!result.token) {
        alert("Session expired! Login again to continue");
        window.location.href = "/login";
        return;
      }
      try {
        const response = await fetch(`${API_URL}/auth/get-info/`, {
          headers: { Authorization: `Bearer ${result.token}` },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch user info');
        }

        const formattedDate = format(date, "yyyy-MM-dd");
        const res = await axios.get(`${API_URL}/admin/mess/meal-ratings`, {
          params: { date: formattedDate, college: data.college, hostel: data.hostel },
        });
        setData(res.data);
      } catch (err) {
        console.error("Error fetching meal ratings:", err);
      }
    };
    fetchInfoAndData();
  }, [date]);

  return (
    <div className="bg-stubgdark w-full h-full py-4 px-6 flex flex-col gap-y-5 overflow-auto scrollbar-thin scrollbar-webkit">
      <div className="py-2">
        <h1 className="bg-stubgdark text-dashtext py-2 flex justify-center align-center text-2xl md:text-3xl font-bold">
          Mess Meal Ratings Dashboard
        </h1>
        <p className="bg-stubgdark pb-2 text-ratedashsecondary flex justify-center text-md md:text-lg font-medium">
          View and analyze student feedback for mess meals
        </p>
      </div>

      <div className="bg-stubgcard p-4 rounded-md shadow-none flex items-center gap-4 border-1 border-ratedashborder">
        <label className="font-medium text-dashtext">Filter by Date:</label>
        <input type="date" value={format(date, "yyyy-MM-dd")}
          onChange={(e) => setDate(new Date(e.target.value))}
          className="bg-black text-white border border-gray-600 rounded px-2 py-1
           focus:outline-none focus:ring-2 focus:ring-white 
           [&::-webkit-calendar-picker-indicator]:invert 
           [&::-webkit-calendar-picker-indicator]:cursor-pointer"
        />
      </div>

      {data && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-3">
            <div className="bg-gradient-to-t from-blue-200 to-blue-100 text-ratedashdate p-4 rounded-md border-1 border-ratedashborder">
              <p className="text-sm font-medium">Selected Date</p>
              <p className="text-2xl font-bold">{format(date, "MMMM do, yyyy")}</p>
            </div>
            <div className="bg-gradient-to-t from-green-200 to-green-100 text-ratedashtotal p-4 rounded-md border-1 border-ratedashborder">
              <p className="text-sm font-medium">Total Ratings</p>
              <p className="text-2xl font-bold">{data.totalRatings}</p>
            </div>
            <div className="bg-gradient-to-t from-yellow-200 to-yellow-100 text-ratedashavg p-4 rounded-md border-1 border-ratedashborder">
              <p className="text-sm font-medium">Average Rating</p>
              <p className="text-2xl font-bold">{data.averageRating}</p>
            </div>
            <div className="bg-gradient-to-t from-purple-200 to-purple-100 text-ratedashtop p-4 rounded-md border-1 border-ratedashborder">
              <p className="text-sm font-medium">Top Rated Meal</p>
              <p className="text-2xl font-bold capitalize">{data.topMeal}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <MealBox title="Breakfast" data={data.summary.breakfast} />
            <MealBox title="Lunch" data={data.summary.lunch} />
            <MealBox title="Snacks" data={data.summary.snacks} />
            <MealBox title="Dinner" data={data.summary.dinner} />
          </div>
        </>
      )}
    </div>
  );
};

export default MealRatingsDashboard;