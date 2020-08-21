import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { setMassage } from "../Action/actionType";

export default function Example() {
  const msg = useSelector((state) => state.group.msg);
  const [smShow, setSmShow] = useState(true);
  const dispatch = useDispatch();
  const [modalMsg, setModalMsg] = useState("");
  console.log(msg);
  useEffect(() => {
    if (msg === "MAKE_POST") {
      setSmShow(true);
      setModalMsg("Your post has been successfully created.");
    } else if (msg === "UPDATE_POST") {
      setSmShow(true);
      setModalMsg("Your post has been successfully updated.");
    } else if (msg === "DELETE_POST") {
      setSmShow(true);
      setModalMsg("Your post has been successfully deleted.");
    } else {
      setSmShow(false);
      setModalMsg("");
    }
  }, [msg]);
  const handleModalClose = () => {
    dispatch(setMassage());
    setSmShow(false);
  };
  return (
    <React.Fragment>
      <Modal
        size="md"
        show={smShow}
        onHide={handleModalClose}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header className="Modal-header" closeButton>
          <Modal.Title
            id="example-modal-sizes-title-sm"
            className="modal-title"
          >
            <div className="Modal-Header-icon">
              <h1>
                <CheckCircleIcon style={{ fontSize: 60, color: "white" }} />
              </h1>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="Modal-body">
            <h1>Great!</h1>
            <h4>{modalMsg}</h4>
            <Button className="button" onClick={handleModalClose}>
              Close
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}
