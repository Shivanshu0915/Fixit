const express = require("express");
const router = express.Router();
const upload = require("../config/fileComplaintMulter");

const {
    createComplaint,
    uploadComplaint,
} = require('../controller/user');


router.post("/upload-complaint", upload.array("files", 10), uploadComplaint);
router.post("/create-complaint", createComplaint);

module.exports = router;
