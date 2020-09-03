import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import { useStyles } from "../../assests/style";
import IconButton from "@material-ui/core/IconButton";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { useDispatch } from "react-redux";
import { groupPost } from "../../Action/actionType";
import Button from "@material-ui/core/Button";

function Posts({ id, token }) {
  const [content, setcontent] = useState("");
  const [file, setFile] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(file);
    if (file || content) {
      const formData = new FormData();
      formData.append("id", id);

      formData.append("content", content);
      formData.append("file", file);
      dispatch(groupPost({ data: formData, token: token }));
      setcontent("");
      setFile("");
    }
  };

  return (
    <div className="card">
      <Card>
        <Paper className={classes.paper}>
          <section className="comment-input-file">
            <form onSubmit={handleSubmit}>
              <div className="write-post">
                <textarea
                  rows="7"
                  placeholder="write your post and Share your kids activity"
                  value={content}
                  onChange={(event) => setcontent(event.target.value)}
                />
              </div>

              <div className="input-icon">
                <input
                  accept="image/jpeg, image/png"
                  className={classes.input}
                  id="icon-button-file"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <label htmlFor="icon-button-file">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <CameraAltIcon />
                  </IconButton>
                </label>
              </div>
              <Button
                type="submit"
                variant="contained"
                className={classes.root}
              >
                Post
              </Button>
            </form>
          </section>
        </Paper>
      </Card>
    </div>
  );
}

export default Posts;
