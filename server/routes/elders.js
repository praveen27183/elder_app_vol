import express from "express";
import User from "../models/User.js";

const router = express.Router();

/**
 * @route   GET /api/elders/profile
 */
router.get("/profile", async (req, res) => {
    try {
        // For now, we'll return the first elder in the DB
        // In production, this would use req.user.id from JWT
        const elder = await User.findOne({ role: "elder" });
        if (!elder) {
            return res.status(404).json({ message: "Elder profile not found" });
        }
        res.json({ elder });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @route   GET /api/elders/bookings
 */
router.get("/bookings", async (req, res) => {
    try {
        // Mocking sample bookings that match the frontend interface
        const bookings = [
            { 
                id: "1", 
                serviceType: "medical", 
                title: "Doctor Appointment Escort", 
                status: "accepted", 
                scheduledDate: new Date(Date.now() + 86400000).toISOString() 
            },
            { 
                id: "2", 
                serviceType: "grocery", 
                title: "Weekly Grocery Run", 
                status: "completed", 
                scheduledDate: new Date(Date.now() - 86400000).toISOString() 
            }
        ];
        res.json({ bookings });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @route   GET /api/elders/stats
 */
router.get("/stats", async (req, res) => {
    try {
        res.json({
            totalBookings: 12,
            completedBookings: 8,
            pendingBookings: 4
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
