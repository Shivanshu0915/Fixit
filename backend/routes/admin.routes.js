const express = require("express");
const authenticateUser = require("../middlewares/authenticateUser");
const router = express.Router();
const upload3 = require("../config/profileImageMulter");

const {
    resolveComplaint,
    getAdminProfileData,
    updateAdminProfileData,
    uploadAdminProfileImage
} = require("../controller/admin");


// complaints related
router.patch("/resolve-complaint/:id", authenticateUser, resolveComplaint)

// profile related
router.get("/profile", authenticateUser, getAdminProfileData)
router.put("/profile/update-data", authenticateUser, updateAdminProfileData)
router.post("/profile/upload-image", authenticateUser, upload3.single("image"), uploadAdminProfileImage)

module.exports = router;
