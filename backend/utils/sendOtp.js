const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
//load env
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user:process.env.EMAIL_USER.trim(),
        pass:process.env.EMAIL_PASS.trim()
    },
});

const sendOtpEmail = async (email, otp) => {
    try {
        console.log("Email is: ", email);
        const mailOptions = {
            from:process.env.EMAIL_USER.trim(),
            to:email.trim(),
            subject: "Your OTP Code",
            text: `Your OTP for signup verification is: ${otp}. This OTP will expire in 5 minutes.`,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending OTP email:", error);
    }
};

module.exports = { sendOtpEmail };
