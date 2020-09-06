const mongoose = require("mongoose");

//const MONGODB_URI = 'mongodb://127.0.0.1:27017/vyorius'

const options = {
  // reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  // reconnectInterval: 500, // Reconnect every 500ms
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

const MONGODB_URI = require("../config/key").MongoURI;

mongoose.connect(MONGODB_URI, options, (err) =>
  err
    ? console.log({ error: err, message: "any error with db" })
    : console.log("successfully connectd to db")
);

module.exports = mongoose;
