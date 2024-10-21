const mongoose = require('mongoose');

// Define a schema for students
const StudentSchema = new mongoose.Schema({
    regno: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    gender: {
        type: String
    }
});

// Create a Student model using the schema
const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
