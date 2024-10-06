const http = require('http');
const querystring = require('querystring');
const mongoose = require('mongoose');

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
    gender: String
});

// Create a model based on the schema
const Student = mongoose.model('Student', studentSchema);

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const parsedData = querystring.parse(body);
            const { regno, name, phone, password, year, gender } = parsedData;

            // Create a new student instance
            const student = new Student({
                regno,
                name,
                phone,
                password,
                year: parseInt(year),
                gender
            });

            // Save the student data to MongoDB
            student.save()
                .then(() => {
                    console.log('Data inserted successfully');
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write('<center>Data has been successfully saved to the database.</center>');
                    res.end();
                })
                .catch(err => {
                    console.error('Error saving data:', err);
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.write('<center>Error saving data. Please try again.</center>');
                    res.end();
                });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<center>404 - Not Found</center>');
        res.end();
    }
});

server.listen(9000, () => {
    console.log("Server is running @ http://localhost:9000");
});
