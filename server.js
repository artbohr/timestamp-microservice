const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Timestamp API endpoint...
app.get("/api/timestamp/:date_string?", (req, res) => {
  // if it's undefined set current time, else pass the provided value
  const date = req.params.date_string === undefined ? new Date().toString() : req.params.date_string;

  // check that it's not a number
  if (isNaN(date)) {
    var timeStamp = new Date(date) === "Invalid Date" ? null : new Date(date);
  } else {
    var timeStamp = new Date(date * 1000) === "Invalid Date" ? null : new Date(date * 1000);
  }

  res.json({ unix: Math.floor(timeStamp.getTime() / 1000), utc: timeStamp.toUTCString() });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
