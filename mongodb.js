const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/studentdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Create a schema for student data
const studentSchema = new mongoose.Schema({
    regno: String,
    name: String,
    phone: String,
    password: String,
    year: Number,
    // gender: String
});

// Create the model for the 'students' collection
const Student = mongoose.model('students', studentSchema);

const app = express();

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: false }));

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static files like CSS, JS, etc.
app.use(express.static(path.join(__dirname, 'assets')));

// Route to serve the registration form
app.get('/register', (req, res) => {
    res.render('register');
});

// Route to handle form submission
app.post('/submit_register', (req, res) => {
    const { regno, name, phone, password, year } = req.body;

    // Create a new student instance
    const student = new Student({
        regno,
        name,
        phone,
        password,
        year: parseInt(year),
        // gender
    });

    // Save the student data to MongoDB
    student.save()
        .then(() => {
            console.log('Data inserted successfully');
            res.send('<center>Data has been successfully saved to the database.</center>');
        })
        .catch(err => {
            console.error('Error saving data:', err);
            res.status(500).send('<center>Error saving data. Please try again.</center>');
        });
});

app.listen(9000, () => {
    console.log('Server is running on http://localhost:9000');
});
