//create web server
var http = require('http');
//create file system
var fs = require('fs');
//create url
var url = require('url');

//create server
http.createServer(function (request, response) {
    //get the path name
    var pathname = url.parse(request.url).pathname;

    //print the pathname
    console.log("Request for " + pathname + " received.");

    //read the file from the server
    fs.readFile(pathname.substr(1), function (err, data) {
        if (err) {
            //print error
            console.log(err);
            //HTTP status: 404 : NOT FOUND
            //Content Type: text/plain
            response.writeHead(404, {'Content-Type': 'text/html'});
        } else {
            //Page found
            //HTTP status: 200 : OK
            //Content Type: text/plain
            response.writeHead(200, {'Content-Type': 'text/html'});

            //write the content of the file to response body
            response.write(data.toString());
        }
        //send the response body
        response.end();
    });
}).listen(8081);

//print message
console.log('Server running at http://