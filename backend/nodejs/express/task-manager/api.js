const express = require('express');
const connectDB = require('./config/db');
const Task = require('./models/Task');
require('dotenv').config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// --- API ROUTES ---

// 1. GET ALL TASKS
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({ success: true, count: tasks.length, data: tasks });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 2. CREATE A TASK
app.post('/api/tasks', async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ success: true, data: task });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

// 3. UPDATE/TOGGLE TASK STATUS
app.patch('/api/tasks/:id', async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ success: false, message: 'Not found' });

        task.completed = !task.completed;
        await task.save();
        
        res.status(200).json({ success: true, data: task });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

// 4. DELETE A TASK
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ success: false, message: 'Not found' });
        
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
});
