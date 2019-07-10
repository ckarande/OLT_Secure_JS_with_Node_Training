var request = require('request');

// Make a HTTP request to fetch a resouce
function doGET() {
    const api = 'api/v1/storage';
    const sendCompressed = false;
    const email = 'user@client.com';
    const resource = 'hello.txt';

    request.get({
        uri: `http://localhost:3600/${api}?sendCompressed=${sendCompressed}&email=${email}&resource=${resource}`,
        headers: {
            'client_id': 'id_x',
            'token': 'bigWombat'
        }
    }, function (err, res) {
        if (err) console.log(res.body);
        else console.log(res.body);
    });
}

// Test a GET Request
doGET();
