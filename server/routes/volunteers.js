import express from "express";
import Volunteer from "../models/Volunteer.js";

const router = express.Router();

/**
 * @route   GET /api/volunteers
 */
router.get("/", async (req, res) => {
    try {
        const volunteers = await Volunteer.find().sort({ createdAt: -1 });
        res.json(volunteers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @route   POST /api/volunteers
 */
router.post("/", async (req, res) => {
    try {
        const volunteer = new Volunteer(req.body);
        const savedVolunteer = await volunteer.save();
        res.status(201).json(savedVolunteer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
