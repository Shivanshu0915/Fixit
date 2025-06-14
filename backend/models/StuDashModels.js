const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'registered students', required: true, index: true },
    category: { type: String, required: true, index: true },
    subCategory: { type: String, required: true },
    title: { type: String, required: true },
    content: {
        text: { type: String, required: true },
        media: [{ type: { type: String, enum: ['image', 'video'] }, url: { type: String } }]
    },
    datePosted: { type: Date, default: Date.now, index: true },
    isResolved: { type: Boolean, default: false }
});

// Index for efficient sorting
ComplaintSchema.index({ category: 1, datePosted: -1 });
const ComplaintData = mongoose.model('complaints', ComplaintSchema);

module.exports = { 
    ComplaintData,
};
