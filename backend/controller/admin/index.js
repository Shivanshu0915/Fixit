const complaintController = require("./complaint.controller")
const profileController = require("./profile.controller");

module.exports = {
    ...complaintController,
    ...profileController
}