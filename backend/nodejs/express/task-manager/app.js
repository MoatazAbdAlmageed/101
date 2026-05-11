const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const Task = require('./models/Task');
require('dotenv').config();

// Connect to Database
connectDB();

const app = express();

// View Engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- UI ROUTES ---

// GET Home Page
app.get('/', async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.render('index', { tasks });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// POST Add Task
app.post('/add', async (req, res) => {
    try {
        if (req.body.title.trim()) {
            await Task.create({ title: req.body.title });
        }
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error adding task');
    }
});

// POST Toggle Task
app.post('/toggle/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task) {
            task.completed = !task.completed;
            await task.save();
        }
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error toggling task');
    }
});

// POST Delete Task
app.post('/delete/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error deleting task');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
