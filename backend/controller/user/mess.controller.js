const { MessMenuData } = require("../../models/AdminDashModels");

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

module.exports = {
    getMessMenu,

}