const express = require('express');
const app = express();
const busRoutes = require('./routes/busRoutes');

// Middleware
app.use(express.json()); // To parse incoming JSON requests

// Routes
app.use('/api/buses', busRoutes);

// Error handling
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
