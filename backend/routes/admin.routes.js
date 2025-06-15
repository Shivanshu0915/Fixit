const express = require("express");
const authenticateUser = require("../middlewares/authenticateUser");
const router = express.Router();

const {
    resolveComplaint
} = require("../controller/admin");

// complaints related
router.patch("/resolve-complaint/:id", authenticateUser, resolveComplaint)

module.exports = router;
