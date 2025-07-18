const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getAllStudents,
  getProfile,
  updateProfile,
  payFees,
} = require("../controllers/studentController");
const { createCheckoutSession } = require("../controllers/paymentController");

router.get("/", getAllStudents); // Public
router.get("/profile", authMiddleware, getProfile); // Private
router.put("/profile", authMiddleware, updateProfile); // Private
router.post("/pay", authMiddleware, payFees); // Private
router.post("/create-checkout-session", authMiddleware, createCheckoutSession);
module.exports = router;
