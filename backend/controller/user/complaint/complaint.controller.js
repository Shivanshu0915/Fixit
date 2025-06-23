const upload = require("../../../config/fileComplaintMulter"); // Import multer configuration
const mongoose = require("mongoose")
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

const getComplaints = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_JWT_TOKEN_SECRET);
        if (!decoded.email || !decoded.role || !decoded.id) {
            return res.status(403).json({ error: "Invalid token" });
        }

        const { category, college, hostel, sortBy = "newest", cursor, limit = 10, lastUpvotes, lastDownvotes } = req.query;
        const userId = decoded.id;

        // const matchStage = { studentId: { $exists: true } };

        const matchStage = {
            studentId: { $exists: true },
            isResolved: false // <-- Added condition here for filtering only unresolved complaints
        };

        if (category) matchStage.category = category;

        // For date-based sorting
        if (cursor && (sortBy === "newest" || sortBy === "oldest")) {
            const cursorId = new mongoose.Types.ObjectId(cursor);
            matchStage._id = sortBy === "oldest" ? { $gt: cursorId } : { $lt: cursorId };
        }

        const aggregationPipeline = [
            { $match: matchStage },

            // Lookup student info
            {
                $lookup: {
                    from: "registered students",
                    localField: "studentId",
                    foreignField: "_id",
                    as: "student"
                }
            },
            { $unwind: "$student" },

            // Filter by college and hostel
            {
                $match: {
                    "student.college": college,
                    "student.hostel": hostel
                }
            },

            // Lookup votes
            {
                $lookup: {
                    from: "votes",
                    localField: "_id",
                    foreignField: "complaintId",
                    as: "votes"
                }
            },

            // Add vote fields
            {
                $addFields: {
                    upvotes: {
                        $size: {
                            $filter: {
                                input: "$votes",
                                as: "v",
                                cond: { $eq: ["$$v.voteType", 1] }
                            }
                        }
                    },
                    downvotes: {
                        $size: {
                            $filter: {
                                input: "$votes",
                                as: "v",
                                cond: { $eq: ["$$v.voteType", -1] }
                            }
                        }
                    },
                    netVotes: { $subtract: ["$upvotes", "$downvotes"] },
                    userVote: {
                        $let: {
                            vars: {
                                userVoteDoc: {
                                    $arrayElemAt: [
                                        {
                                            $filter: {
                                                input: "$votes",
                                                as: "v",
                                                cond: {
                                                    $eq: ["$$v.studentId", new mongoose.Types.ObjectId(userId)]
                                                }
                                            },
                                        },
                                        0
                                    ]
                                }
                            },
                            in: { $ifNull: ["$$userVoteDoc.voteType", null] }
                        }
                    }
                }
            }
        ];

        // Add cursor filtering for vote-based sorting
        if (cursor && (sortBy === "mostUpvoted" || sortBy === "mostDownvoted")) {
            const cursorId = new mongoose.Types.ObjectId(cursor);
            if (sortBy === "mostUpvoted") {
                aggregationPipeline.push({
                    $match: {
                        $or: [
                            { upvotes: { $lt: parseInt(lastUpvotes) } },
                            { upvotes: parseInt(lastUpvotes), _id: { $lt: cursorId } }
                        ]
                    }
                });
            } else if (sortBy === "mostDownvoted") {
                aggregationPipeline.push({
                    $match: {
                        $or: [
                            { downvotes: { $lt: parseInt(lastDownvotes) } },
                            { downvotes: parseInt(lastDownvotes), _id: { $lt: cursorId } }
                        ]
                    }
                });
            }
        }

        // Sort
        aggregationPipeline.push({
            $sort: (() => {
                switch (sortBy) {
                    case "oldest": return { datePosted: 1, _id: 1 };
                    case "mostUpvoted": return { upvotes: -1, _id: -1 };
                    case "mostDownvoted": return { downvotes: -1, _id: -1 };
                    case "newest":
                    default: return { datePosted: -1, _id: -1 };
                }
            })()
        });

        aggregationPipeline.push({ $limit: parseInt(limit) });

        const complaints = await ComplaintData.aggregate(aggregationPipeline);

        const lastComplaint = complaints[complaints.length - 1];
        const nextCursor = lastComplaint ? {
            cursor: lastComplaint._id,
            lastUpvotes: lastComplaint.upvotes,
            lastDownvotes: lastComplaint.downvotes
        } : null;

        res.json({ complaints, nextCursor });

    } catch (error) {
        console.error("Error fetching complaints:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    uploadComplaint,
    createComplaint,
    getComplaints
}