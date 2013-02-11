/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */

var path = require("path");
var url = require("url");
var http = require("http");

var chatRoomsData = {};

exports.handleRequest = function(request, response, headers) {
  var chatroom = url.parse(request.url, false, true);
  console.log(chatroom);
  var path = chatroom.pathname.split('/');
  path = path.slice(0, 3);
  path = path.join('/');
  console.log(path);
  switch(request.method){
    case 'GET' : 
      if(path === "/1/classes"){
        getMessages(request,response,headers,chatroom);
      } else {
        var statusCode = 404;
        response.writeHead(statusCode, headers);
        response.end();  
      }
      break;
    case 'POST':
      postMessage(request,response,headers, chatroom);
      break;
    case 'OPTIONS':
      respondOptions(response,headers);
      break;
    default:
      var statusCode = 400;
      response.writeHead(statusCode, headers);
      response.end();  
      console.log('Not possible!');
      break;
  }
};

var getMessages = function(request,response,headers,room) {
  var statusCode = 200;
  if(!(chatRoomsData[room])){
    chatRoomsData[room] = [];
  }
  console.log(chatRoomsData[room].toString());
  var body = chatRoomsData[room].toString()
  body = '{[' + body + ']}';
  response.writeHead(statusCode, headers);
  response.end(body);
}

var postMessage = function(request,response,headers,room) {
  var statusCode = 201;
  response.writeHead(statusCode, headers);
  request.on('data', function(chunk) {
    console.log("Received body data:");
    chatRoomsData[room].push(chunk);
  });
  response.end();
}

var respondOptions = function(response,headers) {
  var statusCode = 200;
  response.writeHead(statusCode, headers);
  response.end();
}