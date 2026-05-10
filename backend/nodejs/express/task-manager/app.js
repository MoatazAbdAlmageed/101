const express = require('express'); // Import the Express framework
const app = express(); // Initialize an Express application instance
const path = require('path'); // Import the built-in path module for handling file paths

app.set('view engine', 'ejs'); // Set EJS as the template engine for rendering HTML
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies (form data)
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files (CSS, images) from the 'public' folder

let tasks = [ // Initialize a global array to store tasks in memory
    { id: 1, title: 'Learn Express.js fundamentals', completed: true }, // Sample task 1
    { id: 2, title: 'Build a premium Task Manager app', completed: false }, // Sample task 2
    { id: 3, title: 'Master EJS templating', completed: false } // Sample task 3
];

app.get('/', (req, res) => { // Define the route for the home page (HTTP GET)
    res.render('index', { tasks }); // Render 'index.ejs' and pass the tasks array to the view
});

app.post('/add', (req, res) => { // Define the route to add a new task (HTTP POST)
    const newTask = { // Create a new task object
        id: Date.now(), // Use the current timestamp as a unique ID
        title: req.body.title, // Get the task title from the form submission
        completed: false // Set the initial status to not completed
    };
    if (newTask.title.trim()) { // Check if the title is not just empty spaces
        tasks.push(newTask); // Add the new task to the global array
    }
    res.redirect('/'); // Redirect the user back to the home page to see the updated list
});

app.post('/toggle/:id', (req, res) => { // Define the route to toggle task completion (HTTP POST)
    const id = parseInt(req.params.id); // Get the task ID from the URL parameters and convert to integer
    const task = tasks.find(t => t.id === id); // Find the task in the array that matches the ID
    if (task) { // If the task is found
        task.completed = !task.completed; // Toggle the completed status (true to false or vice versa)
    }
    res.redirect('/'); // Redirect back to the home page
});

app.post('/delete/:id', (req, res) => { // Define the route to delete a task (HTTP POST)
    const id = parseInt(req.params.id); // Get the task ID from the URL parameters
    tasks = tasks.filter(t => t.id !== id); // Filter the array to remove the task with the matching ID
    res.redirect('/'); // Redirect back to the home page
});

const PORT = process.env.PORT || 3000; // Define the server port (environment variable or default to 3000)
app.listen(PORT, () => { // Start the Express server
    console.log(`Task Manager App running at http://localhost:${PORT}`); // Log a message when the server starts
});
