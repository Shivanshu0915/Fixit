const express = require("express");
const authenticateUser = require("../middlewares/authenticateUser");
const router = express.Router();
const upload2 = require("../config/messMenuMulter");
const upload3 = require("../config/profileImageMulter");

const {
    resolveComplaint,
    getAdminProfileData,
    updateAdminProfileData,
    uploadAdminProfileImage,
    uploadMessMenu,
    getMealRatingsSummary,
    addAdmin
    
} = require("../controller/admin");

// complaints related
router.patch("/resolve-complaint/:id", authenticateUser, resolveComplaint)

// profile related
router.get("/profile", authenticateUser, getAdminProfileData)
router.put("/profile/update-data", authenticateUser, updateAdminProfileData)
router.post("/profile/upload-image", authenticateUser, upload3.single("image"), uploadAdminProfileImage)

// mess related
router.post("/mess/upload-menu", authenticateUser, upload2.single('menuImage'), uploadMessMenu);
router.get("/mess/meal-ratings", getMealRatingsSummary)

// add admin
router.post("/add-admin", authenticateUser, addAdmin);

module.exports = router;
