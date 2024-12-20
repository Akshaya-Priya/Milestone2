const express = require('express');
const router = express.Router();
const busController = require('../controllers/busController');

// Routes
router.get('/schedules', busController.getAllSchedules); // Get all bus schedules
router.post('/add-schedule', busController.addSchedule); // Add a new bus schedule
router.get('/real-time-arrivals', busController.getRealTimeArrivals); // Get real-time arrivals
router.get('/optimal-route', busController.getOptimalRoute); // Get the optimal route between two stops

module.exports = router;
