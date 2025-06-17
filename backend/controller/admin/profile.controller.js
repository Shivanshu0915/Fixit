const { AdminData } = require("../../models/AuthModel");

const getAdminProfileData = async(req,res)=>{
    try {
        const userId = req.user.id;
        const user = await AdminData.findById(userId).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const updateAdminProfileData = async(req,res)=>{
    try {
        const userId = req.user.id;
        const { name, college, hostel, category, position, phone, email } = req.body;

        const updated = await AdminData.findByIdAndUpdate(
            userId,
            { name, college, hostel, category, position, phone, email },
            { new: true, runValidators: true }
        );

        if (!updated) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'Profile updated successfully', data: updated });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: 'Server error' });
    }
}

const uploadAdminProfileImage = async(req,res)=>{
    try {
        const imageUrl = req.file.path;
        const userId = req.user.id;
        const updated = await AdminData.findByIdAndUpdate(
            userId,
            { profileImage: imageUrl },
            { new: true }
        );
        res.json({ message: 'Profile image uploaded', imageUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Upload failed' });
    }
}

module.exports = {
    getAdminProfileData,
    updateAdminProfileData,
    uploadAdminProfileImage
}