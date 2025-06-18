const { MessMenuData } = require("../../models/AdminDashModels");
const { MealRatingData } = require("../../models/StuDashModels");

const uploadMessMenu = async(req, res) => {
    try {
        const { college, hostel } = req.body;
        if (!req.file || !req.file.path) {
            return res.status(400).json({ error: 'Image upload failed' });
        }
        const imageUrl = req.file.path;
        const existing = await MessMenuData.findOne({ college, hostel });

        if (existing) {
            existing.imageUrl = imageUrl;
            existing.updatedAt = Date.now();
            await existing.save();
        } else {
            const newMenu = new MessMenuData({ college, hostel, imageUrl });
            await newMenu.save();
        }
        return res.status(200).json({ message: 'Mess menu uploaded successfully' });
    } catch (err) {
        console.error("Upload error:", err);
        res.status(500).json({ error: 'Server error during mess menu upload' });
    }
}

const getMealRatingsSummary = async (req, res) => {
  try {
    const { date, college, hostel } = req.query;
    if (!date || !college || !hostel) {
      return res.status(400).json({ message: "Date, college, and hostel are required." });
    }

    const mealTypes = ["breakfast", "lunch", "snacks", "dinner"];
    const summary = {};

    for (let meal of mealTypes) {
      const ratings = await MealRatingData.aggregate([
        { $match: { date, mealType: meal, college, hostel } },
        {
          $group: {
            _id: "$rating",
            count: { $sum: 1 }
          }
        }
      ]);

      const totalRatings = ratings.reduce((acc, r) => acc + r.count, 0);
      const ratingMap = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      ratings.forEach(r => ratingMap[r._id] = r.count);

      const average = totalRatings
        ? ((ratings.reduce((acc, r) => acc + (r._id * r.count), 0)) / totalRatings).toFixed(1)
        : 0;

      summary[meal] = {
        ratingsCount: ratingMap,
        totalRatings,
        average: parseFloat(average)
      };
    }

    // Find the top rated meal
    let topMeal = null;
    let maxAvg = -1;
    for (let meal in summary) {
      if (summary[meal].average > maxAvg) {
        topMeal = meal;
        maxAvg = summary[meal].average;
      }
    }

    res.json({
      date,
      totalRatings: Object.values(summary).reduce((a, b) => a + b.totalRatings, 0),
      averageRating: parseFloat((
        Object.values(summary).reduce((acc, r) => acc + (r.average * r.totalRatings), 0)
        / Object.values(summary).reduce((acc, r) => acc + r.totalRatings, 0)
      ).toFixed(1)),
      topMeal,
      summary
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
    uploadMessMenu,
    getMealRatingsSummary
}