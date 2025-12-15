const SibApiV3Sdk = require("sib-api-v3-sdk");

const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];

apiKey.apiKey = process.env.BREVO_API_KEY;

const transactionalApi = new SibApiV3Sdk.TransactionalEmailsApi();

const sendEmail = async ({ to, subject, html }) => {
  try {
    return await transactionalApi.sendTransacEmail({
      sender: {
        email: process.env.BREVO_SMTP_USER, // ✅ VERIFIED sender
        name: process.env.BREVO_SENDER_NAME,
      },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    });
  } catch (err) {
    console.error("Brevo sendEmail error:", err.response?.body || err);
    throw err;
  }
};

module.exports = { sendEmail };
