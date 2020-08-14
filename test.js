const newItem = new Item({
  groupName: "Leanifii",
  followerGroupUser: [
    {
      userName: "Praveen",
    },
  ],
  groupPost: [
    {
      userName: "Praveeb",
      content: "hey super cool",
      noumberOfShare: 1,
      like: [
        {
          userName: " String",
        },
      ],

      commentSection: [
        {
          userName: "Praveebn",
          comment: "super cool",
          like: [
            {
              userName: "Praveen",
            },
          ],
          reply: [{ content: " String", userName: "Prvaeebn" }],
        },
      ],
    },
  ],
});
