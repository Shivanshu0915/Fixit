const { StudentData, AdminData, CollegeName } = require("../models/AuthModel");
const { UserSignupValidate, AdminSignupValidate } = require("../utils/AuthZods");
const { sendOtpEmail } = require("../utils/sendOtp");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const login = async (req, res) => {
    const { email, password, isAdmin } = req.body;
    const role = isAdmin ? "admin" : "user";

    try {
        const user = isAdmin ? await AdminData.findOne({ email }) : await StudentData.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 🔥 Check if JWT secrets are defined
        if (!process.env.ACCESS_JWT_TOKEN_SECRET || !process.env.REFRESH_JWT_TOKEN_SECRET) {
            console.error("JWT secrets are missing!");
            return res.status(500).json({ message: "Server error: Missing JWT secrets" });
        }
        // Generate JWT tokens
        const accessToken = jwt.sign(
            { id: user._id, email, role },
            process.env.ACCESS_JWT_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
            { id: user._id, email, role },
            process.env.REFRESH_JWT_TOKEN_SECRET,
            { expiresIn: "7d" }
        );

        // Set refresh token in HTTP-only cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.COOKIE_SECURE === "true",  // "true" in .env for prod
            sameSite: process.env.COOKIE_SAMESITE || "Lax" // "None" for prod if cross-site
        });

        res.json({ accessToken, role });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Refresh Token Handler
const refreshToken = (req, res) => {
    console.log("Checking refresh token...");
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    jwt.verify(token, process.env.REFRESH_JWT_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log("Invalid or expired refresh token");
            // CLEAR COOKIE WHEN TOKEN IS INVALID/EXPIRED
            res.clearCookie("refreshToken");
            return res.status(403).json({ message: "Invalid refresh token" });
        }
        const { id, email, role } = decoded;
        const accessToken = jwt.sign({ id, email, role }, process.env.ACCESS_JWT_TOKEN_SECRET, { expiresIn: "15m" });
        res.json({ accessToken, role });
    });
};


// Logout - Clear refresh token
const logout = (req, res) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.COOKIE_SECURE === "true",
        sameSite: process.env.COOKIE_SAMESITE || "Lax"
    });
    res.json({ message: "Logged out" });
};


// OTP functions
const otpStore = new Map();

const requestOtp = async (req, res) => {
    const signupData = req.body;
    // console.log(signupData);
    const { email, college, isAdmin } = signupData;
    // Check if email is in valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ msg: "Invalid email format." });
    }

    // Checking for correct email domain of college
    if (isAdmin === false) {
        const collegeData = await CollegeName.findOne({ name: college });
        if (!collegeData) {
            return res.status(400).json({ msg: "College does not exist." });
        }
        // Extract domain from user email
        const userDomain = email.split('@')[1].toLowerCase();
        const requiredDomain = collegeData.domain.toLowerCase();

        if (userDomain !== requiredDomain) {
            return res.status(400).json({
                msg: "Email domain does not match the selected college's official domain."
            });
        }
    }

    let user = signupData.isAdmin ? await AdminData.findOne({ college }) : await StudentData.findOne({ email });
    if (user) {
        if (isAdmin) {
            return res.status(400).json({
                msg: "Super Admin already exists for this college.",
            })
        } else {
            return res.status(400).json({
                msg: "User already exists",
            })
        }
    }
    if (isAdmin) user = await AdminData.findOne({ email });
    if (user) {
        return res.status(400).json({
            msg: "Super Admin already exists with this email.",
        })
    }
    let parseData = (signupData.isAdmin ? AdminSignupValidate : UserSignupValidate).safeParse(signupData);
    if (!parseData.success) {
        return res.status(411).json({
            msg: "Validation failed!",
            errors: parseData.error.format()
        });
    }
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    const expiresAt = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes

    otpStore.set(email, { otp, expiresAt, userData: signupData });
    await sendOtpEmail(email, otp);
    res.json({ msg: "OTP sent successfully! Please verify." });
};


const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    if (!otpStore.has(email)) {
        return res.status(400).json({ msg: "OTP expired or not requested. Please request again." });
    }
    const { otp: storedOtp, expiresAt, userData } = otpStore.get(email);

    if (Date.now() > expiresAt) {
        otpStore.delete(email);
        return res.status(400).json({ msg: "OTP expired. Please request again." });
    }
    if (otp !== storedOtp.toString()) {
        otpStore.delete(email);
        return res.status(400).json({ msg: "Invalid OTP. Please try again." });
    }
    const { isAdmin } = userData;
    // OTP is correct, store user in DB
    if (isAdmin) {
        otpStore.delete(email);
        return res.json({ msg: "Otp verified successfully!" });
    } else {
        const { isAdmin, name, college, hostel, regNo, phone, email, password } = userData;
        const newUser = new StudentData({ isAdmin, name, college, hostel, regNo, phone, email, password });
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();
        otpStore.delete(email);
        return res.json({ msg: "User registered successfully!" });
    }
};

const resendOtp = async (req, res) => {
    const { email } = req.body;
    if (!otpStore.has(email)) {
        return res.status(400).json({ msg: "No OTP request found. Please sign up again." });
    }
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a new OTP
    const expiresAt = Date.now() + 5 * 60 * 1000; // Reset expiration time

    otpStore.set(email, { otp, expiresAt, userData: otpStore.get(email).userData });
    await sendOtpEmail(email, otp);
    res.json({ msg: "New OTP sent successfully!" });
};

const getInfo = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access token missing or invalid' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_JWT_TOKEN_SECRET);
        const { id, role } = decoded;

        let result;
        if (role === 'user') {
            result = await StudentData.findById(id).select('college hostel');
        } else if (role === 'admin') {
            result = await AdminData.findById(id).select('college hostel');
        } else {
            return res.status(400).json({ error: 'Invalid role' });
        }

        if (!result) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            college: result.college,
            hostel: result.hostel,
            id: result._id
        });
    } catch (err) {
        console.error(err);
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
}

module.exports = {
    requestOtp,
    verifyOtp,
    resendOtp,
    login,
    logout,
    refreshToken,
    getInfo
}