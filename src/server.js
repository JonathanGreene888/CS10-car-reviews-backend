// importing dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// importing routers
const authRouter = require("./routers/authRouter");
const contentRouter = require("./routers/contentRouter");
const paymentRouter = require("./routers/paymentRouter");

// setting up the server
const port = process.env.PORT || 3002; // uses the port provided by the process.env & defaults to 3002 if none is provided
const server = express();

let allowedOrigins = ["http://localhost:3000", "http://yourapp.com"];

// configuring the database
mongoose.Promise = global.Promise; // mongoose's promise library is deprecated, so we sub in the general ES6 promises here
const databaseOptions = {
  useNewUrlParser: true, // mongoose's URL parser is also deprecated, so we pass this in as a option to use the new one
  useUnifiedTopology: true
};
mongoose.set("useCreateIndex", true); // collection.ensureIndex is also deprecated so we use 'useCreateIndex' instead

// connecting to the database
console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, databaseOptions);
mongoose.connection
  .once("open", () => console.log(`The database is connected`))
  .on("error", err => console.warn("error is : ", err));

// setting up middleware
server.use(express.json());
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// test route
server.get("/", (req, res) => res.send(`The server is up and running!`));

// setting up routers
server.use("/auth", authRouter); // router for handling auth related requests, such as login and register
server.use("/api", contentRouter); // router for making requests for data once a user is auth'd
server.use("/payment", paymentRouter); //router for payments

// initializing the server
server.listen(port, () =>
  console.log(`The server is listening on port ${port}`)
);

module.exports = server;
