const express = require('express');
const router = express.Router();
const Quiz = require('../models/QuizSchema');
const Mission = require('../models/Mission');
const Destination = require('../models/Destination')
const Vehicles = require('../models/Vehicles')
const Labs = require('../models/Labs')
// Route to get all quizzes
router.get("/getQuiz", async (req, res) => {
    try {
        const data = await Quiz.find();
        res.json(data);
    } catch (err) {
        console.error("Error fetching quiz details:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Route to get all missions
router.get("/getMission", async (req, res) => {
    try {
        const data = await Mission.find();
        res.json(data);
    } catch (err) {
        console.error("Error fetching mission details:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Route to get all Destinations
router.get("/getDestination", async (req, res) => {
    try {
        const data = await Destination.find();
        res.json(data);
    } catch (err) {
        console.error("Error fetching destination details:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});
// Route to get all Vehicals
router.get("/getVehicles", async (req, res) => {
    try {
        const data = await Vehicles.find();
        res.json(data);
    } catch (err) {
        console.error("Error fetching vehicles details:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});
//Route to get all Labs
router.get("/getLabs", async (req, res) => {
    try {
        const data = await Labs.find();
        res.json(data);
    } catch (err) {
        console.error("Error fetching Labs details:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});
module.exports = router;
