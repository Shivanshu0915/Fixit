const { MessMenuData } = require("../../models/AdminDashModels");

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

module.exports = {
    uploadMessMenu,
}