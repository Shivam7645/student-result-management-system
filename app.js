// Import required modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // For password hashing
const Student = require('./modules/Student');  // Assuming you have this model already

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

// Connect to MongoDB
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/student_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

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
app.post('/submit_login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find student by regno or username
        const student = await Student.findOne({ regno: username });
        if (!student) {
            return res.status(400).send('User not found');
        }

        // Compare the entered password with the hashed password
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).send('Incorrect password');
        }

        // Redirect to home after login (you can change this based on authentication result)
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Registration submission route
app.post('/submit_register', async (req, res) => {
    const { regno, name, phone, password, confirmpassword, year, gender } = req.body;

    // Check if passwords match
    if (password !== confirmpassword) {
        return res.status(400).send('Passwords do not match');
    }

    try {
        // Check if the regno already exists
        const existingStudent = await Student.findOne({ regno });
        if (existingStudent) {
            return res.status(400).send('Registration number already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new student
        const newStudent = new Student({
            regno,
            name,
            phone,
            password: hashedPassword, // Save the hashed password
            year,
            gender
        });

        await newStudent.save();
        console.log(`New student registered: ${name} (Reg No: ${regno})`);

        // Redirect to the login page after successful registration
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error registering student');
    }
});

// 404 error handler for unhandled routes
app.use((_req, res) => {
    res.status(404).render('404', { message: 'Page not found' }); // Render a custom 404 page (if you create 404.pug)
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
