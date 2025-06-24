const {CollegeName, HostelName, AdminData, PendingAdmin } = require("../models/AuthModel");
const bcrypt = require('bcrypt');
// Multer configuration for file uploads
const multer = require("multer");
const upload = multer({ dest: "uploads/" }).single("document");
const fs = require("fs");
require('dotenv').config();
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

const adminSignupRequest = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if(err) return res.status(500).json({ error: "File upload error" });
            const { isAdmin, name, hostel, college, email, password, category, position, phone, domain} = req.body;
            const documentPath = req.file ? req.file.path : '';

            const existingAdmin = await AdminData.findOne({ college });
            if (existingAdmin){
                return res.status(400).json({ 
                    msg: "Super Admin already exists for this college." ,
                })
            }

            // ✅ Check if this email already has a pending request
            const existingPending = await PendingAdmin.findOne({ email });
            if (existingPending) {
                return res.status(400).json({ msg: "A signup request for this email is already pending." });
            }
            // ✅ Proceed to store the pending request
            const hashedPassword = await bcrypt.hash(password, 10);
            const newPending = new PendingAdmin({
                isAdmin,
                name,
                college,
                hostel,
                category,
                position,
                phone,
                email,
                password: hashedPassword,
                document: documentPath,
                domain
            });
            await newPending.save();

            // Read file contents (if file is uploaded)
            let attachments = [];
            if (req.file) {
                attachments.push({
                    filename: req.file.originalname,  // Keep original filename
                    path: documentPath,              // File path
                    contentType: req.file.mimetype   // Preserve MIME type
                });
            }
            // Send email to FixIt owner with attachment
            const mailOptions = {
                from: process.env.EMAIL_USER.trim(),
                to: process.env.EMAIL_BOSS.trim(), // FixIt Owner Email
                subject: 'New Admin Signup Request',
                html: `
                    <p>New admin signup request:</p>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>College:</strong> ${college}</p>
                    <p><strong>Hostel:</strong> ${hostel}</p>
                    <p><strong>Category:</strong> ${category}</p>
                    <p><strong>Position:</strong> ${position}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><a href="${process.env.BACKEND_URL}/auth/approve-admin/${email}">Approve</a> | <a href="${process.env.BACKEND_URL}/auth/reject-admin/${email}">Reject</a></p>
                `,
                attachments: attachments.length > 0 ? attachments : []  // Attach file if present
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.error("Error sending email:", err);
                    return res.status(500).json({ error: "Failed to send signup request email. Please try again later." });
                } else {
                    console.log("Email sent:", info.response);
                }
                // Delete the uploaded file if present
                if (documentPath) {
                    fs.unlink(documentPath, (err) => {
                        if (err) {
                            console.error("Error deleting file:", err);
                        } else {
                            console.log("Uploaded file deleted:", documentPath);
                        }
                    });
                }
                res.json({ message: 'Signup request submitted. Awaiting approval.' });
            });
        });

    } catch (error) {
        console.error('Error processing signup request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// API: Approve Admin
const acceptSignup = async (req, res) => {
    const { email } = req.params;
    const pending = await PendingAdmin.findOne({ email });
    if (!pending) return res.status(400).json({ error: 'Pending admin not found' });

    // Move to AdminData
    const newAdmin = new AdminData({
        isAdmin: pending.isAdmin,
        name: pending.name,
        college: pending.college,
        hostel: pending.hostel,
        category: pending.category,
        position: pending.position,
        phone: pending.phone,
        email: pending.email,
        password: pending.password,
    });
    await newAdmin.save();

    // Ensure college/hostel are saved
    const existingCollege = await CollegeName.findOne({ name: pending.college });
    if (!existingCollege) await new CollegeName({ 
        name: pending.college,
        domain: pending.domain
    }).save();

    const existingHostel = await HostelName.findOne({ name: pending.hostel });
    if (!existingHostel) await new HostelName({
        name: pending.hostel,
        domain: pending.domain
    }).save();
    
    // Send approval email to admin
    const mailOptions = {
        from: process.env.EMAIL_USER.trim(),
        to: email,
        subject: 'Your Super Admin Signup is Approved!',
        html: `<p>Your admin account for ${pending.college} at Fixit has been approved. You can now login to continue.</p>`
    };
    transporter.sendMail(mailOptions);

    // Delete pending entry
    await PendingAdmin.deleteOne({ email });
    res.send('Admin request approved successfully.');
};

// API: Reject Admin
const rejectSignup = async (req, res) => {
    const { email } = req.params;
    const pending = await PendingAdmin.findOne({ email });
    if (!pending) return res.status(400).json({ error: 'Pending admin not found' });
    
    // Send rejection email to admin
    const mailOptions = {
        from: process.env.EMAIL_USER.trim(),
        to: email,
        subject: 'Your Admin Signup is Rejected!',
        html: `<p>Your request to register as a super admin for ${pending.college} at Fixit has been rejected.</p>`
    };
    transporter.sendMail(mailOptions);
    await PendingAdmin.deleteOne({ email });
    res.send('Admin request rejected.');
}

module.exports = {
    adminSignupRequest,
    rejectSignup,
    acceptSignup
}