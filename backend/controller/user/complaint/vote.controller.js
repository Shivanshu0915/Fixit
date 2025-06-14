require('dotenv').config();
const jwt = require("jsonwebtoken");
const { VoteData } = require('../../../models/StuDashModels');

const voteComplaints = async (req, res) => {
    try {
        // validating accessToken and fetching id from it.
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_JWT_TOKEN_SECRET);
        if (!decoded.email || !decoded.role || !decoded.id) {
            return res.status(403).json({ error: "Invalid token" });
        }

        const { complaintId, voteType } = req.body;
        const studentId = decoded.id;

        console.log("Received vote request:", { complaintId, voteType, studentId });

        if (!complaintId || !studentId || ![1, -1, 0].includes(voteType)) {
            return res.status(400).json({ message: "Invalid request data" });
        }

        let existingVote = await VoteData.findOne({ complaintId, studentId });

        if (existingVote) {
            if (voteType === 0) {
                // If voteType is 0, remove the vote
                await VoteData.deleteOne({ _id: existingVote._id });
                existingVote = null;
            } else {
                // Update voteType if the user changes their vote
                existingVote.voteType = voteType;
                await existingVote.save();
            }
        } else {
            // Create new vote if none exists
            existingVote = await VoteData.create({ complaintId, studentId, voteType });
        }

        // Fetch updated counts
        const upvotes = await VoteData.countDocuments({ complaintId, voteType: 1 });
        const downvotes = await VoteData.countDocuments({ complaintId, voteType: -1 });

        res.json({ success: true, upvotes, downvotes, userVote: existingVote ? existingVote.voteType : null });
    } catch (error) {
        console.error("Error processing vote:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const getUserVote = async (req, res) => {
    try {
        // validating accessToken and fetching id from it.
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_JWT_TOKEN_SECRET);
        if (!decoded.email || !decoded.role || !decoded.id) {
            return res.status(403).json({ error: "Invalid token" });
        }

        const { complaintId } = req.params;
        const studentId = decoded.id; // Extract studentId from token

        if (!complaintId || !studentId) {
            return res.status(400).json({ message: "Invalid request data" });
        }

        const existingVote = await VoteData.findOne({ complaintId, studentId });

        res.json({
            success: true,
            userVote: existingVote ? existingVote.voteType : null,
        });
    } catch (error) {
        console.error("Error fetching user vote:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    voteComplaints,
    getUserVote,
}