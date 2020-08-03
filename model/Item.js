const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  groupName: {
    type: String,
    required: true,
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
      userName: {
        type: String,
        required: true,
      },
      userPhoto: {
        type: String,
      },
      video: {
        type: String,
      },
      image: {
        type: String,
      },
      content: {
        type: String,
      },
      location: {
        type: String,
      },
      noumberOfShare: {
        type: Number,
      },
      like: [
        {
          id: String,
          userName: String,
          userPhoto: String,
        },
      ],

      commentSection: [
        {
          comment: {
            type: String,
          },
          like: [
            {
              id: String,
              userId: String,
            },
          ],
          time: {
            type: String,
            default: new Date().toString(),
          },
          reply: [{ content: String }],
        },
      ],
    },
  ],
});

module.exports = Item = mongoose.model("item", ItemSchema);
