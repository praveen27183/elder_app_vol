import express from "express";
import db from "../db/connection.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "elder-ease-secret-key-2026";

// @route   POST /auth/register
// @desc    Register a new user
router.post("/register", async (req, res) => {
  try {
    const { email, password, role, firstName, lastName, phone, age, address, skills } = req.body;
    
    let collection = await db.collection("users");
    
    // Check if user exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      email,
      password: hashedPassword,
      role: role || 'elder',
      firstName,
      lastName,
      phone,
      age,
      address,
      skills: skills || [],
      createdAt: new Date()
    };

    const result = await collection.insertOne(newUser);
    
    // Create token
    const token = jwt.sign(
      { id: result.insertedId, role: newUser.role }, 
      SECRET_KEY, 
      { expiresIn: "24h" }
    );

    res.status(201).json({ 
      token, 
      user: { 
        id: result.insertedId, 
        email, 
        role: newUser.role, 
        firstName, 
        lastName 
      } 
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// @route   GET /auth/profile
// @desc    Get current user profile
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    let user;
    try {
      let collection = await db.collection("users");
      user = await collection.findOne({ email });
    } catch (dbErr) {
      console.warn("DB disconnected, using mock login for:", email);
      // Fallback mock logic for development
      if (email.includes("elder")) {
        user = { _id: "mock_elder", email, password: "mock", role: "elder", firstName: "Mock", lastName: "Elder" };
      } else {
        user = { _id: "mock_vol", email, password: "mock", role: "volunteer", firstName: "Mock", lastName: "Volunteer" };
      }
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // In mock mode, we skip password check or accept "password"
    if (user.password !== "mock") {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
    }

    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      SECRET_KEY, 
      { expiresIn: "24h" }
    );

    res.status(200).json({ 
      token, 
      user: { 
        id: user._id, 
        email: user.email, 
        role: user.role, 
        firstName: user.firstName, 
        lastName: user.lastName 
      } 
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
});

router.get("/profile", async (req, res) => {
    // For simplicity without full middleware check now
    const mockProfile = {
        firstName: "System",
        lastName: "User",
        email: "user@example.com",
        role: "elder",
        phone: "9876543210",
        age: 72,
        address: {
            street: "123 Anna Nagar",
            city: "Chennai",
            state: "Tamil Nadu",
            pincode: "600040"
        }
    };
    res.json(mockProfile);
});

export default router;
