require("dotenv").config();
const express = require("express");
const app = express();
var cors = require("cors");
const db = require("./db");

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.use(express.json());

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

try {
  db.authenticate();
  console.log("Database connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const authRoutes = require("./routes/auth");

app.get("/", (req, res) => {
  res.send("<h1>Hello, Express.js Server!</h1>");
});

app.use("/auth", authRoutes);
