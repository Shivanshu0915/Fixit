const complaintControllers = require('./complaint');
const profileController = require('./profile.controller');
const messController = require('./mess.controller');

module.exports = {
    ...complaintControllers,
    ...profileController,
    ...messController,
    
};
