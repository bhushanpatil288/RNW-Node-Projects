const http = require('http');
const fs = require('fs');
const PORT = 8080;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile('./index.html', 'utf-8', (err, content) => {
            if (!err) {
                res.write(content);
            } else {
                res.write('Something went wrong...');
            };
            res.end();
        });
    } else if (req.url === '/about') {
        fs.readFile('./about.html', 'utf-8', (err, content) => {
            if (!err) {
                res.write(content);
            } else {
                res.write('Something went wrong...');
            };
            res.end();
        });
    } else if (req.url === '/contact') {
        fs.readFile('./contact.html', 'utf-8', (err, content) => {
            if (!err) {
                res.write(content);
            } else {
                res.write('Something went wrong...');
            };
            res.end();
        });
    } else if (req.url === '/services') {
        fs.readFile('./services.html', 'utf-8', (err, content) => {
            if (!err) {
                res.write(content);
            } else {
                res.write('Something went wrong...');
            }
            res.end();
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});

        res.write(`
            <h1>404 - Page not found</h1>
            <a href='/'>Got to Home</a>
        `);

        res.end();
    }
})

server.listen(PORT, (err) => {
    if (!err) {
        console.log(`Listening on http://localhost:${8080}/`);
    }
})