const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
                res.end(err ? 'Error' : data);
            });
        } else {
            res.end(data);
        }
    });
});

server.listen(3000, () => console.log('Server started'));