const mongoose = require("mongoose");
const { stringify } = require("uuid");

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
  followerGroupUser: [
    {
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
  groupPost: [
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
      content: {
        type: String,
        trim: true,
      },
      location: {
        type: String,
      },
      noumberOfShare: {
        type: Number,
      },
      like: [
        {
          userId: String,
          userName: String,
          userPhoto: String,
        },
      ],

      commentSection: [
        {
          userName: {
            type: String,
            required: true,
            trim: true,
          },
          userPhoto: String,
          comment: {
            type: String,
          },
          like: [
            {
              userPhoto: String,
              userName: { type: String, trim: true },
            },
          ],
          time: {
            type: String,
            default: new Date().toString(),
          },
          reply: [
            {
              content: String,
              userName: { type: String, required: true, trim: true },
            },
          ],
        },
      ],
    },
  ],
});

module.exports = Item = mongoose.model("item", ItemSchema);
