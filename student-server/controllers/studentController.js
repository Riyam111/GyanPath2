const Student = require("../models/Student");

// GET /api/students/ - All students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({}, "name email feesPaid");
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/students/profile - Logged-in student's profile
const getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.studentId).select("-password");
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/students/profile - Update name or email
const updateProfile = async (req, res) => {
  const { name, email } = req.body;
  try {
    const student = await Student.findByIdAndUpdate(
      req.studentId,
      { name, email },
      { new: true }
    ).select("-password");
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

// POST /api/students/pay - Simulate payment
const payFees = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.studentId,
      { feesPaid: true },
      { new: true }
    );
    res.json({ message: "Fees Paid Successfully", student });
  } catch (err) {
    res.status(500).json({ message: "Payment failed" });
  }
};

module.exports = {
  getAllStudents,
  getProfile,
  updateProfile,
  payFees,
};
