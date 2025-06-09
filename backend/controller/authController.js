const { StudentData, AdminData, CollegeName} = require("../models/AuthModel");
const { UserSignupValidate, AdminSignupValidate } = require("../utils/AuthZods");
const { sendOtpEmail } = require("../utils/sendOtp");
const bcrypt = require("bcrypt");

// OTP functions
const otpStore = new Map();

const requestOtp = async (req, res) => {
    const signupData = req.body;
    // console.log(signupData);
    const {email, college, isAdmin} = signupData;

    // Check if email is in valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ msg: "Invalid email format." });
    }

    // Checking for correct email domain of college
    if(isAdmin === false){
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

    let user = signupData.isAdmin ? await AdminData.findOne({college}) : await StudentData.findOne({email});
    if(user){
        if(isAdmin){
            return res.status(400).json({ 
                msg: "Super Admin already exists for this college." ,
            })
        }else{
            return res.status(400).json({ 
                msg: "User already exists" ,
            })
        }
    }
    if(isAdmin) user = await AdminData.findOne({email});
    if(user){
        return res.status(400).json({ 
            msg: "Super Admin already exists with this email." ,
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
    const {isAdmin } = userData;
    // OTP is correct, store user in DB
    if (isAdmin) {
        otpStore.delete(email);
        return res.json({ msg: "Otp verified successfully!" });
    } else {
        const { isAdmin, name, college, hostel, regNo, phone, email, password } = userData;
        const newUser = new StudentData({ isAdmin, name, college, hostel, regNo, phone, email, password });
        newUser.password = await bcrypt.hash(password, 10);
        newUser.save();
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

module.exports = {
    requestOtp,
    verifyOtp,
    resendOtp,
}