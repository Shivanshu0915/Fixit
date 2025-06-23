const mealTypeColors = {
    Breakfast: "bg-orange-600",
    Lunch: "bg-red-600",
    Snacks: "bg-blue-600",
    Dinner: "bg-purple-600",
};


const MealBox = ({ title, data }) => {
    const { ratingsCount = {}, average = 0, totalRatings = 0 } = data || {};

    return (
        <div className="bg-stubgcard p-4 rounded-md flex-1 transform transition duration-300 hover:scale-105 border-1 border-ratedashborder hover:shadow-md hover:shadow-compcardshadow">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-ratedashtitle">{title}</h3>
                <span className={`text-sm px-3 py-1 rounded-full ${mealTypeColors[title]} text-white`}>
                    {totalRatings} ratings
                </span>
            </div>
            <p className="text-lg font-medium mb-2 text-ratedashsubtitle">⭐ {average} average</p>
            {[5, 4, 3, 2, 1].map(star => (
                <div key={star} className="flex items-center text-sm mb-1 text-ratedashsubtitle">
                    <span className="w-4">{star}</span>
                    <span className="mx-1">⭐</span>
                    <div className="w-full bg-ratedashbarbg h-2 mx-2 rounded-full overflow-hidden">
                        <div className={`h-2 rounded block ${mealTypeColors[title]}`}
                            style={{ width: totalRatings > 0 ? `${(ratingsCount[star] || 0) / totalRatings * 100}%` : "0%" }}>
                        </div>
                    </div>
                    <span>{ratingsCount[star] || 0}</span>
                </div>
            ))}
        </div>
    );
};

export default MealBox;