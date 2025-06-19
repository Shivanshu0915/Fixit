const { default: mongoose } = require("mongoose");
const { ComplaintData, VoteData } = require("../../models/StuDashModels");

const searchById = async (req, res) => {
  const { complaintId, studentId } = req.query;
  if (!complaintId || !studentId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    let complaint = await ComplaintData.findOne({
      _id: complaintId,
      studentId,
    }).populate('studentId', 'name regNo college hostel');

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    // Count upvotes and downvotes
    const votes = await VoteData.aggregate([
      {
        $match: {
          complaintId: new mongoose.Types.ObjectId(complaintId),
        },
      },
      {
        $group: {
          _id: '$voteType',
          count: { $sum: 1 },
        },
      },
    ]);

    let upvotes = 0;
    let downvotes = 0;
    votes.forEach((vote) => {
      if (vote._id === 1) upvotes = vote.count;
      if (vote._id === -1) downvotes = vote.count;
    });
    // Convert to plain object to allow adding fields
    complaint = complaint.toObject();

    // Embed student info under complaint.student
    complaint.student = complaint.studentId;
    delete complaint.studentId;

    // Embed votes
    complaint.upvotes = upvotes;
    complaint.downvotes = downvotes;

    res.json(complaint);
  } catch (error) {
    console.error("Error in searchById:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

const browseByFilter = async(req, res) => {
    try {
        const { studentId, status = "all", category } = req.query;
        if (!studentId) {
            return res.status(400).json({ error: "studentId is required" });
        }
        const matchStage = {
            studentId: new mongoose.Types.ObjectId(studentId)
        };
        if (status === "resolved") {
            matchStage.isResolved = true;
        } else if (status === "unresolved") {
            matchStage.isResolved = false;
        }
        if (category === "hostel" || category === "mess") {
            matchStage.category = category;
        }

        const complaints = await ComplaintData.aggregate([
            { $match: matchStage },
            // Join student details
            {
                $lookup: {
                    from: 'registered students',
                    localField: 'studentId',
                    foreignField: '_id',
                    as: 'student'
                }
            },
            // { $unwind: '$student' },
            { $unwind: { path: '$student', preserveNullAndEmptyArrays: false } },
            // Join vote data
            {
                $lookup: {
                    from: 'votes',
                    localField: '_id',
                    foreignField: 'complaintId',
                    as: 'votes'
                }
            },
            // Add upvote/downvote counts
            {
                $addFields: {
                    upvotes: {
                        $size: {
                            $filter: {
                                input: '$votes',
                                as: 'vote',
                                cond: { $eq: ['$$vote.voteType', 1] }
                            }
                        }
                    },
                    downvotes: {
                        $size: {
                            $filter: {
                                input: '$votes',
                                as: 'vote',
                                cond: { $eq: ['$$vote.voteType', -1] }
                            }
                        }
                    }
                }
            },
            // Format final output
            {
                $project: {
                    votes: 0,
                    __v: 0,
                    'student.password': 0,
                    'student.__v': 0
                }
            },
            // Sort by most recent
            { $sort: { datePosted: -1 } }
        ]);

        res.status(200).json(complaints);
    } catch (error) {
        console.error("Error fetching complaints:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const complaintsStats = async(req, res)=>{
  const { studentId } = req.query;
  if (!studentId || !mongoose.Types.ObjectId.isValid(studentId)) {
    return res.status(400).json({ error: 'Invalid or missing studentId' });
  }
  try {
    const total = await ComplaintData.countDocuments({ studentId });
    const resolved = await ComplaintData.countDocuments({ studentId, isResolved: true });
    const unresolved = total - resolved;

    return res.status(200).json({ total, resolved, unresolved });
  } catch (err) {
    console.error('Error fetching complaint counts:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
    searchById,
    browseByFilter,
    complaintsStats,
}