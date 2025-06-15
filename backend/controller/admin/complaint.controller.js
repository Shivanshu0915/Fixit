const mongoose = require("mongoose");
const { ComplaintData } = require("../../models/StuDashModels");

const resolveComplaint = async (req, res) => {
  try {
    const userRole = req.user.role;
    if (userRole !== "admin") {
      return res.status(403).json({ error: "Access denied: Admins only" });
    }
    const complaintId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(complaintId)) {
      return res.status(400).json({ error: "Invalid complaint ID" });
    }

    const updatedComplaint = await ComplaintData.findByIdAndUpdate(
      complaintId,
      { isResolved: true },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    res.status(200).json({ message: "Complaint marked as resolved." });
  } catch (err) {
    console.error("Error resolving complaint:", err);
    res.status(500).json({ error: "Error resolving complaint." });
  }
};

module.exports = {
    resolveComplaint,
}