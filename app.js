// Import required modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Create an instance of Express
const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.static(path.join(__dirname, 'assets'))); // Serve static files from the 'assets' directory

// Set the view engine to Pug
app.set('views', path.join(__dirname, 'views')); // Set the views directory
app.set('view engine', 'pug'); // Set Pug as the templating engine

// Routes
app.get('/', (req, res) => {
    res.render('index'); // Render the index.pug file
});

app.get('/login', (req, res) => {
    res.render('login'); // Render the login.pug file
});

app.get('/register', (req, res) => {
    res.render('register'); // Render the register.pug file
});

app.get('/results', (req, res) => {
    res.render('result'); // Render the result.pug file
});

app.get('/settings', (req, res) => {
    res.render('settings'); // Render the settings.pug file
});

app.get('/update_marks', (req, res) => {
    res.render('update_marks'); // Render the update_marks.pug file
});

// Login submission route (you can expand this with actual login logic)
app.post('/submit_login', (req, res) => {
    const { username, password } = req.body;
    // Implement your login logic here (authentication, validation, etc.)
    console.log(`Username: ${username}, Password: ${password}`);
    // Redirect to home after login (you can change this based on authentication result)
    res.redirect('/'); 
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
