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
            'email': 'user@client.com',
            'clientid': 'id_x',
            'token': 'bigWombat'
        }
    }, function (err, res) {
        if (err) console.log(res.body);
        else console.log(res.body);
    });
}

// Test a GET Request
doGET();
