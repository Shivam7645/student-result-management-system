const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        // Handle POST request to receive form data
        let body = '';
        
        // Collect the data chunks
        req.on('data', chunk => {
            body += chunk.toString();
        });

        // Once all data is received
        req.on('end', () => {
            const parsedData = querystring.parse(body);
            const {regNo, name, phone, password,confirmpassword, year, gender } = parsedData;
        
            // Respond with a confirmation page showing submitted data
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<center>');
            res.write(`<strong>Registration Number: </strong> <i>${regNo}</i><br>`);
            res.write(`<strong>Name: </strong> <i>${name}</i><br>`);
            res.write(`<strong>Phone Number: </strong> <i>${phone}</i><br>`);
            res.write(`<strong>Password: </strong> <i>${password}</i><br>`);
            res.write(`<strong>Confirm Password: </strong> <i>${confirmpassword}</i><br>`);
            res.write(`<strong>Year of Study: </strong> <i>${year}</i><br>`);
            res.write(`<strong>Gender: </strong> <i>${gender}</i><br>`);
            res.write('</center>');
            res.end();
        });
    } else {
        // Handle unsupported methods or other requests
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<center>404 - Not Found</center>');
        res.end();
    }
});

server.listen(9000, () => {
    console.log("Server is running @ http://localhost:9000");
});
