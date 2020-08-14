const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const items = require("./routes/api/items");
//bodyparser Middleware

app.use(bodyParser.json());

//db connections

const db = require("./config/key").MongoURI;
mongoose.connect(
  db,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) =>
    err
      ? console.log(" any error with db")
      : console.log("Mongoose database connected ")
);

// use routes
app.use("/api", items);

const PORT = process.env.PORT || 4000;

app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`server started on ${PORT}`)
);
