const express = require("express");
const app = express();

app.get("/", (req, res) => {
  var ip =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);
  res.json({ ip: ip });
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

// const express = require("express");
// const { getClientIp } = require("@supercharge/request-ip");

// const port = 3000;
// const app = express();

// const expressMiddleware = function (req, res, next) {
//   req.ip = getClientIp(req);
//   next();
// };
// app.get(
//   "/",
//   (req, res) => {
//     const myIp = getClientAddress(req);
//     console.log("IP!!!", myIp);
//     res.send({ ip: req.ip });
//   },
//   expressMiddleware
// );
// app.get(
//   "/ip",
//   (req, res) => {
//     const myIp = getClientAddress(req);
//     console.log("IP!!!", myIp);
//     res.send({ ip: req.ip });
//   },
//   expressMiddleware
// );

// const server = app.listen(port, () => {
//   const host = server.address().address;
//   const port = server.address().port;
//   console.log(`Servier is listening on ${host}: ${port}`);
// });

// getClientAddress = function (req) {
//   return (
//     (req.headers["x-forwarded-for"] || "").split(",")[0] ||
//     req.connection.remoteAddress
//   );
// };
