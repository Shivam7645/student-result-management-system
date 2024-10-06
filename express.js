const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 9000;

// Middleware to parse URL-encoded data from form submissions
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
    const { regno, name, phone, password, confirmpassword, year, gender } = req.body;

    // Respond with a confirmation page showing submitted data
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<center>');
    res.write(`<strong>Registration Number: </strong> <i>${regno}</i><br>`);
    res.write(`<strong>Name: </strong> <i>${name}</i><br>`);
    res.write(`<strong>Phone Number: </strong> <i>${phone}</i><br>`);
    res.write(`<strong>Password: </strong> <i>${password}</i><br>`);
    res.write(`<strong>Confirm Password: </strong> <i>${confirmpassword}</i><br>`);
    res.write(`<strong>Year of Study: </strong> <i>${year}</i><br>`);
    res.write(`<strong>Gender: </strong> <i>${gender}</i><br>`);
    res.write('</center>');
    res.end();
});

// Handle unsupported routes
app.use((req, res) => {
    res.status(404).send('<center>404 - Not Found</center>');
});

app.listen(port, () => {
    console.log(`Server is running @ http://localhost:${port}`);
});
