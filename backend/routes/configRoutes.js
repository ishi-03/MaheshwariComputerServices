import express from "express";
const router = express.Router();

router.get("/razorpay", (req, res) => {
  console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
  res.send({ key: process.env.RAZORPAY_KEY_ID });
});

export default router;
