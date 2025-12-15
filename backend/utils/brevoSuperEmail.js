const SibApiV3Sdk = require("sib-api-v3-sdk");
const fs = require("fs");

const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const transactionalApi = new SibApiV3Sdk.TransactionalEmailsApi();

/**
 * Send email via Brevo API
 * Supports attachments
 */
const sendSuperEmail = async ({
  to,
  subject,
  html,
  attachments = [],
}) => {
  try {
    const brevoAttachments = attachments.map(file => ({
      name: file.filename,
      content: fs.readFileSync(file.path).toString("base64"),
    }));

    return await transactionalApi.sendTransacEmail({
      sender: {
        email: process.env.BREVO_SMTP_USER, // VERIFIED sender
        name: process.env.BREVO_SENDER_NAME,
      },
      to: [{ email: to }],
      subject,
      htmlContent: html,
      attachment: brevoAttachments.length ? brevoAttachments : undefined,
    });
  } catch (err) {
    console.error(
      "Brevo sendSuperEmail error:",
      err.response?.body || err
    );
    throw err;
  }
};

module.exports = { sendSuperEmail };
