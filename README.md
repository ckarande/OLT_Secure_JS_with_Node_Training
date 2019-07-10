
## Lab 1: Spot Vulnerabilities


**Scenario**

This lab includes code for a simple web server with a single endpoint `/api/v1/storage` that serves files requested by a client from the `public` folder. It also allows a client to request a file in the compressed gzip format.

We need a second set of eyes to review the code and spot any security issues. Put on your hacker thinking hat and discover as many vulnerabilities as you can in the **controller.js**.

**Setup**

1. Run `npm i` to install required npm packages.
2. Start server by running `npm start` or `node server.js`. You can also start server in a debug mode (In VS Code, this can be done by opening the server.js in the editor, then pressing F5).
3. To send HTTP Requests, invoke the client code by running `node client.js`


**Task**:

As part of this lab, your mission is to do a security code review of the `controller.js` to spot any vulnerabilities. You do not need to fix it, just note it down to discuss later.

Following are the input values a client request can send to the server -

*Endpoint*

`GET /api/v1/storage`

*URL Parameters*
 * email: (Required) Any value in a valid email format, such as: user@client.com
 * resource: (Required) A file name. The server is expected to send files only from the `public` folder, which contains `hello.txt`. Hence, setting the value to `hello.txt` will serve the file `public/hello.txt`
 * sendCompressed: (Optional) set to `true` if the returned file should be in a compressed gzip format. 

*Request Headers*

In addition, a request takes these two these HTTP headers:

* `client_id`: (Required) The only active client ids are 'id_x', 'id-y', and 'id-z' and server is expected to send file only if the client id header matches to one of these.
* `token`: (Required) A valid token value is `bigWombat`.

*Example of a Request*

Here is an example of the client code making a GET request to fetch the `hello.txt` file for a user email `user@client.com` and client_id `id_x` in a compressed format:


```javascript
//Example of a GET request, getting the hello.txt file for user email user@client.com and client_id id_x in a compressed format

var request = require('request');
function doGET() {
    request.get({
        uri: 'http://localhost:3500/api/v1/storage?sendCompressed=true&email=user@client.com&resource=hello.txt',
        headers: {
            'client_id': 'id_x',
            'token': 'bigWombat'
        }
    }, function (err, res) {
        console.log(res.body);
    });
}

doGET();
```

Feel free to change request params and headers in `client.js` to any other values to test the server output.