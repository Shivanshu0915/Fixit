const express = require("express");
const router = express.Router();
const { authController, optionController, superAdminController } = require("../controller");
const { getInfo } = require("../controller/authController");
const { requestOtp, verifyOtp, resendOtp, login, refreshToken, logout} = authController;
const { getCollege, addCollege, getHostel, addHostel} = optionController;
const { adminSignupRequest, rejectSignup, acceptSignup } = superAdminController;
const authenticateUser = require("../middlewares/authenticateUser");

const { changeProfilePass } = require('../controller/user');

// authController
router.post("/signup", requestOtp);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);

router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);


// optionController
router.get("/get-college", getCollege);
router.post("/add-college", addCollege)
router.get("/get-hostel", getHostel);
router.post("/add-hostel", addHostel)

// superAdminController
router.post("/admin-signup-request", adminSignupRequest);
router.get("/approve-admin/:email", acceptSignup);
router.get("/reject-admin/:email", rejectSignup);

// get info
router.get("/get-info", getInfo);

// for changing profile pass
router.put("/change-profile-password", authenticateUser, changeProfilePass);

module.exports = router;