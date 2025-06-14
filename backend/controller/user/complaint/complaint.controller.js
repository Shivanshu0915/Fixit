const upload = require("../../../config/fileComplaintMulter"); // Import multer configuration
const { ComplaintData } = require("../../../models/StuDashModels");
require('dotenv').config();
const jwt = require("jsonwebtoken");

const uploadComplaint = async (req, res) => {
    try {
        console.log("andar aaya");
        if (!req.files || req.files.length === 0) {
            console.log("length empty files ki")
            return res.status(400).json({ error: "No files uploaded" });
        }
        // Extract file URLs from Multer (Cloudinary)
        const uploadedFiles = req.files.map((file) => ({
            type: file.mimetype.startsWith("image") ? "image" : "video",
            url: file.path, // This should be the Cloudinary URL
        }));
        console.log("file names bhi extract hogye");
        res.status(200).json(uploadedFiles);
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "File upload failed" });
    }
};

const createComplaint = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_JWT_TOKEN_SECRET);
        if (!decoded.email || !decoded.role || !decoded.id) {
            return res.status(403).json({ error: "Invalid token" });
        }

        const { category, subCategory, title, content } = req.body;
        const studentId = decoded.id; // Extracted from JWT token
        // Validate required fields
        if (!category || !subCategory || !title || !content || !content.text) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Create a new complaint document
        const newComplaint = new ComplaintData({studentId, category, subCategory, title, content });
        await newComplaint.save();

        res.status(201).json({ message: "Complaint submitted successfully", complaint: newComplaint });
    } catch (error) {
        console.error("Complaint submission error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    uploadComplaint,
    createComplaint,
}