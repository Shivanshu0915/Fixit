const complaintController = require("./complaint.controller")
const profileController = require("./profile.controller");
const messController = require("./mess.controller");
const powerController = require("./power.controller");

module.exports = {
    ...complaintController,
    ...profileController,
    ...messController,
    ...powerController,
}