const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const user = require("./routes/user/user");

//bodyparser Middleware

app.use(bodyParser.json());

// item routes
const apiroutes = require("./routes/api/Index");

app.use("/", apiroutes);

// user routes
app.use("/user", user);

// Serve static assets if in Prduction
if (process.env.NODE_ENV === "production") {
  // Set Static folder
  app.use(express.static("clint/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "clint", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 4000;

app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`server started on ${PORT}`)
);
