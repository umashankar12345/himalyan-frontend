import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdClose } from "react-icons/md";
function BlockModal({
  show,
  setShow,
  message1,
  message2,
  changeResourceStatus,
  status,
}) {
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
          <div>{status ? message1 : message2}</div>
        </div>
        <div className="d-flex justify-content-center mb-3">
          <button
            className="btn btn-danger me-4 px-4"
            onClick={() => changeResourceStatus()}
          >
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
