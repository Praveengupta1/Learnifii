import React, { useState, useEffect } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useStyles } from "../../assests/style";

import { deletePost, updatePost } from "../../Action/actionType";
import { useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";

const MakeAction = ({ post, token }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalDel, setmodalDel] = useState(false);
  const [modalEdit, setmodalEdit] = useState(false);
  const [isEditInput, setIsEditInput] = useState("");

  useEffect(() => {
    setIsEditInput(post.content);
  }, [post.content, post.id]);

  const [isEditFile, setIsEditFile] = useState("");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const dispatch = useDispatch();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = (e) => {
    const data = {
      id: e.target.id,
    };
    dispatch(deletePost({ data: data, token: token }));
    modalDelClose();
  };

  const modalDelClose = () => setmodalDel(false);

  const modalDelShow = () => {
    handleClose();
    setmodalDel(true);
  };

  const modalEditClose = () => {
    setmodalEdit(false);
  };
  const modalEditShow = () => {
    handleClose();
    setmodalEdit(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (isEditInput || isEditFile) {
      console.log(isEditFile, isEditInput);
      const formData = new FormData();
      formData.append("id", e.target.id);
      formData.append("content", isEditInput);
      formData.append("file", isEditFile);

      dispatch(updatePost({ data: formData, token: token }));

      setmodalEdit(false);
      setIsEditFile("");
    }
  };
  return (
    <React.Fragment key={post._id}>
      <IconButton
        aria-label="settings"
        className={classes.button}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            marginTop: "5ch",
          },
        }}
      >
        <MenuItem onClick={modalDelShow}>Delete</MenuItem>
        <MenuItem onClick={modalEditShow}>Edit</MenuItem>
      </Menu>

      <Modal show={modalDel} onHide={modalDelClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure, delete this post</Modal.Body>
        <Modal.Footer>
          <Button className="button" size="sm" onClick={modalDelClose}>
            Cancel
          </Button>
          <Button
            className="button"
            size="sm"
            id={post._id}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={modalEdit} onHide={modalEditClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="edit-text">
              <textarea
                row="5"
                type="text"
                value={isEditInput}
                onChange={(e) => setIsEditInput(e.target.value)}
              />
            </div>
            <div className="edit-file">
              <div>
                <input
                  accept="image/jpeg, image/png"
                  id="icon-button-file"
                  type="file"
                  onChange={(e) => setIsEditFile(e.target.files[0])}
                />
              </div>
              <div>
                <Button className="button" onClick={modalEditClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  onClick={handleEditSubmit}
                  className="button"
                  id={post._id}
                >
                  Edit
                </Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default MakeAction;
