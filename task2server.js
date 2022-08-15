var http = require('http');
var url = require('url').URL;
var fs = require('fs');
var qs = require('querystring');


var port = 3000;
var host = 'localhost';
var localDB = [];

var server = http.createServer(function(req, res) {
  fs.readFile('./index.html', 'utf8', function(err, data) {
    if (err) {
      res.writeHead(404);
      res.end("404 Not Found");
    } else {
      res.writeHead(200, {
        "Content-Type": "text/html"
      });
      res.end(data);
    }

    let urlObj = new URL(req.url, "http://localhost:3000");

    if((req.method == "GET") && (String(urlObj.pathname) === "/my_groceries")) {

      let param_aisle = urlObj.searchParams.get('aisle');
      let param_diet = urlObj.searchParams.getAll("dietparam");

      if(!param_aisle && !param_diet) {
        console.log(`* param_aisle = ${param_aisle} param_diet = ${param_diet}`)
        res.writeHead(400);
        res.end("400 status");
        return;
      }
      
      console.log(`* param_aisle = ${param_aisle} param_diet = ${param_diet}`)
      
      //TODO
    }

    else if ((req.method == "POST") && (String(urlObj.pathname) === "/groceries")) {

      let body = '';
      req.on('data', payload => {
        body += payload.toString();
      });
      req.on('end', () => {
        callback(parse(body));
      });

      //TODO
    }

  });

});

server.listen(port, host, function() {
  console.log(`Listening at http://${ host }:${ port }`);
});