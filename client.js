var request = require('request');

// Make a HTTP request to fetch a resouce
function doGET() {
    const api = 'api/resource';
    const filename = 'hello.txt';
    const compressed = false;
    
    // Send a HTTP GET request with required params and headers
    request.get({
        uri: `http://localhost:3600/${api}?filename=${filename}&compressed=${compressed}`,
        headers: {
            'auth_email': 'user@client.com',
            'auth_client_id': 'id_x',
            'auth_token': 'bigWombat'
        }
    }, function (err, res) {
        if (err) console.log(res.body);
        else console.log(res.body);
    });
}

// Test a GET Request
doGET();
