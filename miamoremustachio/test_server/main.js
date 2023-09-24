const http = require('http');
const server = http.createServer().listen(3000);

server.on('request', (req, res) => {
    switch (req.url) {
        case '/':
            return res.end('Server is running');
        case '/oleg':
        case '/Oleg':
            return res.end('Oleg is running');
        default:
            return res.end('Unidentified request');
    };
});