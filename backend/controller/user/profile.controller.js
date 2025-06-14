const { StudentData, AdminData } = require("../../models/AuthModel");
const bcrypt = require('bcrypt');


const getStudProfileData = async(req,res)=>{
    try {
        const studentId = req.user.id;
        const student = await StudentData.findById(studentId).select('-password');
        if (!student) return res.status(404).json({ message: 'User not found' });

        res.json(student);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const updateStuProfileData = async(req,res)=>{
    try {
        const studentId = req.user.id;
        const { name, college, hostel, phone, email } = req.body;

        const updated = await StudentData.findByIdAndUpdate(
            studentId,
            { name, college, hostel, phone, email },
            { new: true, runValidators: true }
        );

        if (!updated) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'Profile updated successfully', data: updated });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: 'Server error' });
    }
}

const uploadStuProfileImage = async(req,res)=>{
    try {
        const imageUrl = req.file.path;
        const studentId = req.user.id;
        const updated = await StudentData.findByIdAndUpdate(
            studentId,
            { profileImage: imageUrl },
            { new: true }
        );
        res.json({ message: 'Profile image uploaded', imageUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Upload failed' });
    }
}

const changeProfilePass = async(req, res)=>{
    try {
        const userId = req.user.id;
        const userRole = req.user.role;
        const { currentPassword, newPassword } = req.body;

        // Fetch user with password
        const user = await (userRole === "user" ? StudentData : AdminData).findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Compare oldPassword with stored hashed password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Old password is incorrect' });

        // Hash new password and update
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    getStudProfileData,
    updateStuProfileData,
    uploadStuProfileImage,
    changeProfilePass
}