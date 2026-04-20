import express from "express";
import db from "../db/connection.js";

const router = express.Router();

// @route   GET /volunteer
// @desc    Get volunteer specialized data (mock fallback)
router.get("/", async (req, res) => {
  try {
    let collection = await db.collection("users");
    let results = await collection.find({ role: "volunteer" }).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.warn("DB disconnected, returning mock volunteers");
    const mockVolunteers = [
      { firstName: "Reenish", role: "volunteer", skills: ["first aid", "transport"] },
      { firstName: "Anjali", role: "volunteer", skills: ["grocery", "companion"] }
    ];
    res.status(200).json(mockVolunteers);
  }
});

export default router;
