import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdClose } from "react-icons/md";
function BlockModal({ show, setShow }) {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose} centered className="fw-bold">
        <div className="d-flex justify-content-end cursor-pointer">
          <MdClose className="mt-2 me-2" onClick={handleClose} />
        </div>
        <div
          style={{
            height: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>Are you sure you want to deactivate this User?</div>
        </div>
        <div className="d-flex justify-content-center mb-3">
          <button className="btn btn-danger me-4 px-4" onClick={handleClose}>
            yes
          </button>
          <button className="btn btn-danger px-4" onClick={handleClose}>
            No
          </button>
        </div>
      </Modal>
    </>
  );
}

export default BlockModal;
