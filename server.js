// Include modules
const http = require('http');
const url = require('url');
const controller = require('./controller');

// Get port from env properties or set it a default port if not specified
const port = process.env.PORT || 3600;

// Create a http server, listening to requets on the port
http.createServer(function (req, res) {
    // All requests come here first.
    console.log('Received a request...');

    // Verify the requested endpoint is valid
    req.urlParts = url.parse(req.url);
    if (req.urlParts.pathname !== '/api/v1/storage') {
        // If invalid endpoint, terminate the request
        return notFound(req, res);
    } else {
        // Handle request based on the request method
        router(req, res);
    }
}).listen(port);
console.log(`Server running at http://localhost:${port}`);

// Delegate requests to controller functions as per the reqest method
const router = (req, res) => {
    switch (req.method) {
        case 'GET':
            controller.get(req, res);
            break;
        default:
            notFound(req, res);
            break;
    }
};

// Function to send Resource Not Found response for invalid paths
const notFound = (req, res) => {
    res.writeHead(404, { 'Content-type': 'text/plain' });
    res.end('Resource not found!');
};
