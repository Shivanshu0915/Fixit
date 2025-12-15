const { sendEmail } = require("./brevoEmail");

const sendOtpEmail2 = async (email, otp) => {
  try {
    await sendEmail({
      to: email.trim(),
      subject: "Your OTP Code",
      html: `
        <h2>FixIt OTP Verification</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      `,
    });

    console.log("OTP email sent via Brevo API");
  } catch (err) {
    console.error("Brevo OTP error:", err.response?.body || err);
    throw err;
  }
};

module.exports = { sendOtpEmail2 };
