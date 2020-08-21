import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { setMassage } from "../Action/actionType";

export default function Example() {
  const msg = useSelector((state) => state.group.msg);
  const [smShow, setSmShow] = useState(true);
  const dispatch = useDispatch();
  console.log(msg);
  useEffect(() => {
    msg === "UPDATE_POST" || msg === "MAKE_POST" || msg === "DELETE_POST"
      ? setSmShow(true)
      : setSmShow(false);
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
            <h4>Your Data has succesfully updated </h4>
            <Button className="button" onClick={handleModalClose}>
              Small modal
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}
