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
app.get('/', (_req, res) => {
    res.render('index'); // Render the index.pug file
});

app.get('/index', (_req, res) => {
    res.render('index'); // Render the index.pug file
});

app.get('/login', (_req, res) => {
    res.render('login'); // Render the login.pug file
});

app.get('/register', (_req, res) => {
    res.render('register'); // Render the register.pug file
});

app.get('/results', (_req, res) => {
    res.render('results'); // Render the results.pug file
});

app.get('/settings', (_req, res) => {
    res.render('settings'); // Render the settings.pug file
});

app.get('/update_marks', (_req, res) => {
    res.render('update_marks'); // Render the update_marks.pug file
});

// Login submission route
app.post('/submit_login', (req, res) => {
    const { username, password } = req.body;
    // Implement your login logic here (authentication, validation, etc.)
    console.log(`Username: ${username}, Password: ${password}`);
    // Redirect to home after login (you can change this based on authentication result)
    res.redirect('/');
});

// Registration submission route
app.post('/submit_register', (req, res) => {
    const { regno, name, phone, password, confirmpassword, year, gender } = req.body;
    // Implement your registration logic here (validation, storing data, etc.)
    console.log(`Registration Details - Reg No: ${regno}, Name: ${name}, Phone: ${phone}, Year: ${year}, Gender: ${gender}`);
    // Check if passwords match
    if (password !== confirmpassword) {
        return res.status(400).send('Passwords do not match');
    }
    // Redirect to the login page after successful registration (change as needed)
    res.redirect('/login');
});

// 404 error handler for unhandled routes
app.use((_req, res) => {
    res.status(404).render('404', { message: 'Page not found' }); // Render a custom 404 page (if you create 404.pug)
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
