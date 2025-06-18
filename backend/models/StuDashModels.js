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

const VoteSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'registered students', required: true, index: true },
    complaintId: { type: mongoose.Schema.Types.ObjectId, ref: 'complaints', required: true, index: true },
    voteType: { type: Number, enum: [1, -1], required: true } // 1 = upvote, -1 = downvote
});

// Ensure a student can vote only once per complaint
VoteSchema.index({ studentId: 1, complaintId: 1 }, { unique: true });

// --- Meal Rating -----
const MealRatingSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  date: { type: String, required: true }, // Format: "YYYY-MM-DD"
  mealType: { type: String, enum: ["breakfast", "lunch", "snacks", "dinner"], required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  college: { type: String, required: true },
  hostel: { type: String, required: true },
}, { timestamps: true });

MealRatingSchema.index({ studentId: 1, date: 1, mealType: 1 }, { unique: true });

const ComplaintData = mongoose.model('complaints', ComplaintSchema);
const VoteData = mongoose.model('votes', VoteSchema);
const MealRatingData = mongoose.model("MealRating", MealRatingSchema);

module.exports = { 
    ComplaintData,
    VoteData,
    MealRatingData,
    
};
