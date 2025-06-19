const express = require("express");
const router = express.Router();
const upload = require("../config/fileComplaintMulter");
const upload3 = require("../config/profileImageMulter");
const authenticateUser = require("../middlewares/authenticateUser");

const {
    createComplaint,
    uploadComplaint,
    getComplaints,
    getUserVote,
    voteComplaints,
    getStudProfileData,
    updateStuProfileData,
    uploadStuProfileImage,
    getMessMenu,
    createMealRatings,
    getRatingsStu,
    searchById,
    browseByFilter,
    complaintsStats,

} = require('../controller/user');


// Creating / filing a complaint
router.post("/upload-complaint", upload.array("files", 10), uploadComplaint);
router.post("/create-complaint", createComplaint);

// Displaying complaints and handling votes
router.get("/fetch-complaint", getComplaints)
router.get("/get-user-vote/:complaintId", getUserVote);
router.post("/vote-complaint", voteComplaints);

// profile routes
router.get("/profile", authenticateUser, getStudProfileData)
router.put("/profile-update-data", authenticateUser, updateStuProfileData)
router.post("/upload-profile-image", authenticateUser, upload3.single("image"), uploadStuProfileImage)

// mess routes
router.get("/mess/menu", getMessMenu);
router.get("/mess/meal-ratings", getRatingsStu)
router.post("/mess/create-meal-ratings", createMealRatings);

// track complaint routes
router.get("/complaint-search-by-id", searchById)
router.get("/complaint-browse-by-filter", browseByFilter)
router.get("/complaints-statistics", complaintsStats)

module.exports = router;
