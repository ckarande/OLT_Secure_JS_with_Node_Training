// Include core packages from node 
const path = require('path');
const fs = require('fs');
const child_process = require('child_process');

// Include qs package from npm 
const qs = require('qs');

//  Validation to check if a clientId is active
const activeClientIds = {
    'id_x': 'active',
    'id_y': 'active',
    'id_z': 'active'
};
const isActiveClientId = (clientId) => {
    return activeClientIds[clientId] ? true : false; 
};

// Verify that token matches
const validToken = 'bigWombat';
const isValidToken = (token) => {
    return token === validToken;
};

// Verify that email is in correct format
const validEmailRegEx = new RegExp('^([a-zA-Z0-9])(([\-.]|[_]+)?([a-zA-Z0-9]+))*(@){1}[a-z0-9]+[.]{1}(([a-z]{2,3})|([a-z]{2,3}[.]{1}[a-z]{2,3}))$');
const isValidEmail = (email) => {
    return email.match(validEmailRegEx) != null;
};

const serveRequestedResource = async (req, res) => {
    // Extract request query params 
    req.params = qs.parse(req.urlParts.query);
    const filename = req.params.filename;
   
    // Verify that user has provided a filename of the resource to retrive
    if (filename == null || filename === '') {
        return terminate(res);
    }

    // Confine path to serve files inside the resources folder
    let fullPath = path.join(__dirname, 'resources', filename);

    // Wrap try/catch to handle any synchronous errors and any promise reject in await functions
    try {
        // Check if user needs response in compressed format
        const sendCompressed = eval(req.params.compressed);
        // If compressed file requested, defalte (gzip) the requested file
        if (sendCompressed === true) {
            await compressFile(fullPath);
            fullPath = fullPath + '.gz';
        }
        // Read requested file and send it in response
        fs.readFile(fullPath, (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });
    } catch (err) {
        terminate(res);
    }
};

const compressFile = (filePath) => {
    // Run compression asynchronously, but return a promise that caller can watch the status on
    const result = new Promise((resolve, reject) => {
        // Spawn a process to compress file and if successful, resolve promise; otherwise reject it
        const childProcess = child_process.exec('gzip -1 -f -k ' + filePath, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
    return result;
};

// Terminate invalid requests by sending an error code
const terminate = (res) => {
    res.writeHead(400, { 'Content-type': 'text/plain' });
    res.end('Bad Request!');
};

// Handle get requests to the HTTP endpoint
exports.get = (req, res) => {
    // Extract request headers
    const email     = req.headers.auth_email;
    const clientId = req.headers.auth_client_id;
    const token     = req.headers.auth_token;

    // Validate request headers. If invalid, retun error response
    if (!isValidEmail(email) || !isActiveClientId(clientId) || !isValidToken(token)) {
        return terminate(res);
    }
    // Serve requested resource the user
    serveRequestedResource(req, res);
};
