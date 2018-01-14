// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// Timestamp API endpoint...
app.get("/api/timestamp/:date_string?", function(req, res) {
  // if it's undefined set current time, else pass the provided value
  var date = req.params.date_string === undefined ? new Date().toString() : req.params.date_string;

  // check that it's not a number
  if (isNaN(date)) {
    var timeStamp = new Date(date) === "Invalid Date" ? null : new Date(date);
  } else {
    var timeStamp = new Date(date * 1000) === "Invalid Date" ? null : new Date(date * 1000);
  }

  res.json({ unix: Math.floor(timeStamp.getTime() / 1000), utc: timeStamp.toUTCString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
