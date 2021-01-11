require("custom-env").env();
const express = require("express");
const useragent = require("express-useragent");
const { randomBytes } = require("crypto");
const app = express();
//const envVariables = process.env;
// Read vars from envVariables object
//const { APP } = envVariables;
app.use(function (req, res, next) {
  const allowedOrigins = [
    "http://127.0.0.1:8020",
    "http://localhost:4200",
    "http://127.0.0.1:9000",
    "http://localhost:5000",
    process.env["SURVEY_APP"],
    process.env["REPORT_APP"],
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.get("/", (req, res) => {
  console.log("App", process.env["APP"]);
  var ip =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);
  res.json({ ip: ip });
});

app.get("/data", (req, res, err) => {
  if (req.headers["user-agent"].includes("Instagram")) {
    res.send(new randomBytes(3));
  } else {
    console.log(req.headers["user-agent"]);
    res.redirect(req.headers.origin);
  }
  console.log(err);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
