const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const items = require("./routes/api/items");
//bodyparser Middleware
app.use(bodyParser.json());

// db config
const db = require("./config/key").MongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongoose database connected "))
  .catch((err) => console.log(err));

// use routes
app.use("/api", items);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`server started on ${PORT}`)
);
