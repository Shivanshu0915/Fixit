const complaintControllers = require('./complaint');
const profileController = require('./profile.controller');

module.exports = {
    ...complaintControllers,
    ...profileController
};
