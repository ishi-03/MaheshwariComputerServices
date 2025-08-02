import express from "express";
const router = express.Router();

router.get("/razorpay", (req, res) => {
  res.send({ key: process.env.RAZORPAY_KEY_ID });
});

export default router;
