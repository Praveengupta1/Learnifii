const mongoose = require("../db/mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  groupName: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: new Date().toString(),
  },
  followers: [
    {
      userId: {
        type: String,
        required: true,
        trim: true,
      },
      userName: {
        type: String,
        required: true,
        trim: true,
      },
      date: {
        type: Date,
        default: new Date().toString(),
      },
      userPhoto: {
        type: String,
      },
    },
  ],
  posts: [
    {
      time: {
        type: Date,
        default: new Date().toString(),
      },
      userId: {
        type: String,
        required: true,
        trim: true,
      },
      userName: {
        type: String,
        required: true,
        trim: true,
      },
      userPhoto: {
        type: String,
      },
      file: {
        type: String,
      },
      fileType: {
        type: String,
      },
      content: [
        {
          text: String,
          key: String,
        },
      ],

      location: {
        type: String,
      },
      noumberOfShare: {
        type: Number,
      },
      likes: [
        {
          userId: { type: String, trim: true, required: true },
          userName: { type: String, trim: true, required: true },
          userPhoto: String,
        },
      ],

      comments: [
        {
          userId: {
            type: String,
            required: true,
            trim: true,
          },
          userName: {
            type: String,
            required: true,
            trim: true,
          },
          userPhoto: String,
          comment: {
            trim: true,
            type: String,
          },
          likes: [
            {
              userName: { type: String, trim: true },
              userPhoto: String,
              userId: { type: String, trim: true },
            },
          ],
          time: {
            type: String,
            default: new Date().toString(),
          },
          replies: [
            {
              time: { type: Date, default: new Date().toString() },
              content: { type: String, trim: true },
              userName: { type: String, required: true, trim: true },
              userId: { type: String, required: true, trim: true },
              userPhoto: { type: String },
            },
          ],
        },
      ],
    },
  ],
});

module.exports = Item = mongoose.model("Item", ItemSchema);
