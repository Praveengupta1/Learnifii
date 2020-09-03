const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const items = require("./routes/api/items");
const user = require("./routes/user/user");

//bodyparser Middleware

app.use(bodyParser.json());

//db connections

const db = require("./config/key").MongoURI;
mongoose.connect(
  db,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) =>
    err ? console.log(err) : console.log("Mongoose database connected ")
);

// item routes
app.use("/api", items);

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
