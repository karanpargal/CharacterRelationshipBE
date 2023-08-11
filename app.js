const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connectDB = require("./utils/ConnectDB");
const CharacterRoutes = require("./Character/character.routes");
const RelationRoutes = require("./Relation/relation.routes");
const authRoutes = require("./User/user.routes");
const reportRoutes = require("./utils/ReportGen");
const authVerify = require("./middleware/auth");
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/characters", authVerify, CharacterRoutes);
app.use("/relations", authVerify, RelationRoutes);
app.use("/auth", authRoutes);
app.use("/", authVerify, reportRoutes);

app.listen(8000, () => {
  connectDB();
  console.log("Server running on port 8000");
});
