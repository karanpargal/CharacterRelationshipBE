const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connectDB = require("./utils/ConnectDB");
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(8000, () => {
  connectDB();
  console.log("Server running on port 8000");
});
