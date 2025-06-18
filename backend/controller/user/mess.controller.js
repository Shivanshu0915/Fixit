const { MessMenuData } = require("../../models/AdminDashModels");
const { MealRatingData } = require("../../models/StuDashModels");

const getMessMenu = async (req, res) => {
    const { college, hostel } = req.query;
    if (!college || !hostel) {
        return res.status(400).json({ error: "College and hostel are required" });
    }
    try {
        const menu = await MessMenuData.findOne({ college, hostel });
        if (!menu) {
            return res.status(404).json({ error: 'Mess menu not found' });
        }
        res.status(200).json({
            imageUrl: menu.imageUrl,
            updatedDate: menu.updatedAt,
        });
    } catch (err) {
        console.error("Error fetching mess menu:", err);
        res.status(500).json({ error: 'Server error while fetching mess menu' });
    }
}

const getRatingsStu = async(req, res) =>{
    const { studentId, date } = req.query;

    if (!studentId || !date) {
        return res.status(400).json({ error: "Missing studentId or date" });
    }

    try {
        const ratings = await MealRatingData.find({ studentId, date });
        return res.json(ratings);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
}

const createMealRatings = async(req, res) =>{
    const { studentId, college, hostel, date, mealType, rating } = req.body;

    try {
        const existing = await MealRatingData.findOne({ studentId, date, mealType });

        if (existing) {
            existing.rating = rating;
            await existing.save();
        } else {
            await MealRatingData.create({ studentId, college, hostel, date, mealType, rating });
        }

        res.status(200).json({ message: "Rating submitted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to submit rating" });
    }
}

module.exports = {
    getMessMenu,
    createMealRatings,
    getRatingsStu,
}