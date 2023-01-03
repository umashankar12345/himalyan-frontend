import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
function EditResourceModal({ show, setShow }) {
  //   const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Resource</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3 fw-bold"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>User Role</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                autoFocus
                className="shadow-none"
              />
            </Form.Group>
            <Form.Group
              className="mb-3 fw-bold"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                className="shadow-none"
              />
            </Form.Group>
            <Form.Group
              className="mb-3 fw-bold"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Emp Id</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                className="shadow-none"
              />
            </Form.Group>
            <Form.Group
              className="mb-3 fw-bold"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                className="shadow-none"
              />
            </Form.Group>

            <Form.Group
              className="mb-3 fw-bold"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Branch</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                className="shadow-none"
              />
            </Form.Group>

            <Form.Group
              className="mb-3 fw-bold"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Organisation</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                className="shadow-none"
              />
            </Form.Group>

            <Form.Group
              className="mb-3 fw-bold"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder=""
                className="shadow-none"
              />
            </Form.Group>

            <Form.Group
              className="mb-3 fw-bold"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Team Lead</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                className="shadow-none"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="flat" className="btn-medium" onClick={handleClose}>
            Close
          </Button>
          <Button variant="flat" className="btn-medium" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditResourceModal;
