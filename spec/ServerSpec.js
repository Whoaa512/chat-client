var handler = require("../request-handler");

function StubRequest(url, method, postdata) {
  this.url = url;
  this.method = method;
  this._postData = postdata;
  this.setEncoding = function(type) {
    //ignore
  };
  var self = this;
  this.on = function(type, callback) {
    if (type == "data") {
      // turn postdata (dictionary object) into raw postdata
      // raw postdata looks like this:
      // username=jono&message=do+my+bidding
      var fields = [];
      for (var key in self._postData) {
        fields.push(key + "=" + self._postData[key].replace(" ", "+"));
      }
      callback(fields.join("&"));
    }
    if (type == "end") {
      callback();
    }
  };
}

function StubResponse() {
  this.ended = false;
  this.responseCode = null;
  this.headers = null;
  this.data = null;
  var self = this;
  this.write  = function(data) {};
  this.writeHead = function(responseCode, headers) {
    console.log("WriteHead called with " + responseCode);
    self.responseCode = responseCode;
    self.headers = headers;
  }
  this.end = function(data) {
    console.log("Response.end called.");
    self.ended = true;
    self.data = data;
  }
}

describe("Node Server Request Listener Function", function() {
 it("Should answer GET requests for /1/classes/dune", function() {
   var req = new StubRequest("http://127.0.0.1:8080/1/classes/dune",
                             "GET");
   var res = new StubResponse();

   handler.handleRequest(req, res);

   expect(res.responseCode).toEqual(200);
   expect(res.data).toEqual("[]");
   expect(res.ended).toEqual(true);
 });

 xit("Should accept posts to /1/classes/dune", function() {
   var req = new StubRequest("http://127.0.0.1:8080/1/classes/dune",
                             "POST",
                            {username: "Jono",
                             message: "Do my bidding!"});
   var res = new StubResponse();

   handler.handleRequest(req, res);

   expect(res.responseCode).toEqual(201);
   expect(res.data).toEqual();
   expect(res.ended).toEqual(true);

   // Now if we request the log for that room,
   // the message we posted should be there:
   var req = new StubRequest("http://127.0.0.1:8080/1/classes/dune",
                             "GET");
   var res = new StubResponse();

   handler.handleRequest(req, res);

   expect(res.responseCode).toEqual(200);
   var messageLog = JSON.parse(res.data);
   expect(messageLog.length).toEqual(1);
   expect(messageLog[0].username).toEqual("Jono");
   expect(messageLog[0].message).toEqual("Do my bidding!");
   expect(res.ended).toEqual(true);
 });


 it("Should 404 when asked for a nonexistent file", function() {
   var req = new StubRequest("http://127.0.0.1:8080/arglebargle",
                             "GET");
   var res = new StubResponse();

   handler.handleRequest(req, res);
   console.log("Res is " + res);

   // Wait some time before checking results:
   waits(1000);

   runs(function() {
     expect(res.responseCode).toEqual(404);
     expect(res.ended).toEqual(true);
   });
 });


});
