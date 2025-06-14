const express = require("express");
const router = express.Router();
const upload = require("../config/fileComplaintMulter");

const {
    createComplaint,
    uploadComplaint,
    getComplaints,
    getUserVote,
    voteComplaints

} = require('../controller/user');

// Creating / filing a complaint
router.post("/upload-complaint", upload.array("files", 10), uploadComplaint);
router.post("/create-complaint", createComplaint);

// Displaying complaints and handling votes
router.get("/fetch-complaint", getComplaints)
router.get("/get-user-vote/:complaintId", getUserVote);
router.post("/vote-complaint", voteComplaints);

module.exports = router;
