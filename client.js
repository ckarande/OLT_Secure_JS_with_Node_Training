var request = require('request');

// Make a HTTP request to fetch a resouce
function doGET() {
    request.get({
        uri: `http://localhost:3600/api/v1/storage?sendCompressed=false&email=user@client.com&resource=hello.txt`,
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
