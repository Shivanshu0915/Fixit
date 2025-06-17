const complaintController = require("./complaint.controller")
const profileController = require("./profile.controller");
const messController = require("./mess.controller");

module.exports = {
    ...complaintController,
    ...profileController,
    ...messController,
}