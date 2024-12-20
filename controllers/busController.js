const Bus = require('../models/Bus');
const { findShortestPath } = require('../utils/graph');

// Dummy data for bus schedules (Session 1: Arrays)
let busSchedules = [
    new Bus(1, 'Bus A', 'Stop 1', 'Stop 5', ['Stop 1', 'Stop 2', 'Stop 3', 'Stop 4', 'Stop 5'], '08:00 AM'),
    new Bus(2, 'Bus B', 'Stop 2', 'Stop 6', ['Stop 2', 'Stop 3', 'Stop 4', 'Stop 5', 'Stop 6'], '08:30 AM'),
    new Bus(3, 'Bus C', 'Stop 3', 'Stop 7', ['Stop 3', 'Stop 4', 'Stop 5', 'Stop 6', 'Stop 7'], '09:00 AM')
];

// Dummy data for real-time arrivals (Session 2: Queues)
let realTimeArrivals = [
    { busId: 1, stop: 'Stop 1', arrivalTime: '08:05 AM' },
    { busId: 2, stop: 'Stop 3', arrivalTime: '08:45 AM' },
    { busId: 3, stop: 'Stop 4', arrivalTime: '09:10 AM' }
];

// Get all bus schedules
exports.getAllSchedules = (req, res) => {
    res.status(200).json({ schedules: busSchedules });
};

// Add a new bus schedule
exports.addSchedule = (req, res) => {
    const { id, name, startStop, endStop, route, time } = req.body;
    const newBus = new Bus(id, name, startStop, endStop, route, time);
    busSchedules.push(newBus);
    res.status(201).json({ message: 'Bus schedule added successfully', bus: newBus });
};

// Get real-time bus arrivals
exports.getRealTimeArrivals = (req, res) => {
    res.status(200).json({ arrivals: realTimeArrivals });
};

// Get the optimal route between two stops (Session 6: Graphs)
exports.getOptimalRoute = (req, res) => {
    const { start, end } = req.query;
    const routeGraph = {
        'Stop 1': ['Stop 2', 'Stop 3'],
        'Stop 2': ['Stop 1', 'Stop 3', 'Stop 4'],
        'Stop 3': ['Stop 2', 'Stop 4', 'Stop 5'],
        'Stop 4': ['Stop 3', 'Stop 5', 'Stop 6'],
        'Stop 5': ['Stop 4', 'Stop 6', 'Stop 7'],
        'Stop 6': ['Stop 5', 'Stop 7'],
        'Stop 7': ['Stop 6']
    };

    try {
        const path = findShortestPath(routeGraph, start, end);
        res.status(200).json({ message: 'Optimal route found', path });
    } catch (error) {
        res.status(500).json({ message: 'Unable to calculate optimal route', error: error.message });
    }
};
