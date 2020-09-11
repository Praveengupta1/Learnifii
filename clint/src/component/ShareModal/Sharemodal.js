import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import {
  WhatsappIcon,
  LinkedinIcon,
  TwitterIcon,
  FacebookIcon,
} from "react-share";
import { Link } from "react-router-dom";

import "./shareModal.css";

export default function ShareModal({ show, handleClose, url }) {
  return (
    <div className="shareModal">
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header className="shareModal" closeButton>
          <Modal.Title>Share Event </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="shareIcon">
            <Link
              to={{
                pathname: `https://api.whatsapp.com/send?text=${url}`,
              }}
              target="_blank"
            >
              <WhatsappIcon size={42} />
            </Link>
            <Link
              to={{
                pathname: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
              }}
              target="_blank"
            >
              <LinkedinIcon size={42} />
            </Link>
            <Link
              to={{ pathname: `https://twitter.com/intent/tweet?url=${url}` }}
              target="_blank"
            >
              <TwitterIcon size={42} />
            </Link>
            <Link
              to={{
                pathname: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
              }}
              target="_blank"
            >
              <FacebookIcon size={42} />
            </Link>
          </div>
          <div className="shareIcon">
            <Button className="button" onClick={handleClose}>
              Close
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
