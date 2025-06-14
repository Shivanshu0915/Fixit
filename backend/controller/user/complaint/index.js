const complaintController = require('./complaint.controller');
const voteController = require('./vote.controller');

module.exports = {
    ...complaintController,
    ...voteController,
};
