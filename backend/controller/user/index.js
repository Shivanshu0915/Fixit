const complaintControllers = require('./complaint');
const profileController = require('./profile.controller');
const messController = require('./mess.controller');
const trackController = require('./track.controller');

module.exports = {
    ...complaintControllers,
    ...profileController,
    ...messController,
    ...trackController,
};
