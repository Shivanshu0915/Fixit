const { AdminData } = require("../../models/AuthModel");
const bcrypt = require("bcrypt");

const addAdmin = async (req, res) => {
    try {
        const userRole = req.user.role;
        if (userRole !== "admin") {
            return res.status(403).json({ error: "Access denied: Admins only" });
        }
        const isAdmin = true;
        const { fullName, college, hostel, department, position, mobile, email, password } = req.body;

        // Check if admin with the same email already exists
        const existingAdmin = await AdminData.findOne({ email: email });
        if (existingAdmin) {
            return res.status(400).json({ error: "An admin with this email already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new AdminData({
            isAdmin,
            name: fullName,
            college,
            hostel,
            category: department,
            position,
            phone: mobile,
            email,
            password: hashedPassword
        });

        await newUser.save();

        return res.json({ msg: "Admin added successfully!" });

    } catch (err) {
        console.error("Error adding admin:", err);
        res.status(500).json({ error: "Error adding admin." });
    }
};

module.exports = {
    addAdmin,
};
