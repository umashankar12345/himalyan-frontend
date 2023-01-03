import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import Axios from "../../../utils/api";

const initialFormData = {
  client_name: "",
  client_email: "",
  client_address: "",
  company: "",
};

const initialValidationErrorFields = {
  client_name: "",
  client_email: "",
  client_address: "",
  company: "",
};

function EditClientModal({ show, setShow }) {
  //   const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [validationError, setValidationError] = useState(
    initialValidationErrorFields
  );
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateFormFields = () => {
    setValidationError(initialValidationErrorFields);
    let error = {};
    const { client_name, client_email, client_address, company } = formData;

    if (!client_name) {
      error.client_name = "Required";
    }
    if (!client_email) {
      error.client_email = "Required";
    }
    if (!client_address) {
      error.client_address = "Required";
    }
    if (!company) {
      error.company = "Required";
    }
    if (Object.keys(error).length > 0) {
      console.log(error);
      setValidationError(error);
      console.log("error is present");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("inside handle submit");
    if (validateFormFields()) {
      console.log("hi");
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3 fw-bold"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                className="shadow-none"
                name="client_name"
                value={formData.client_name}
                onChange={onChangeHandler}
              />
              <div className="text-danger">{validationError?.client_name}</div>
            </Form.Group>
            <Form.Group
              className="mb-3 fw-bold"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Client Address</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                className="shadow-none"
                name="client_address"
                value={formData.client_address}
                onChange={onChangeHandler}
              />
              <div className="text-danger">
                {validationError?.client_address}
              </div>
            </Form.Group>
            <Form.Group
              className="mb-3 fw-bold"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="client_email"
                placeholder=""
                className="shadow-none"
                name="email"
                value={formData.client_email}
                onChange={onChangeHandler}
              />
              <div className="text-danger">{validationError?.client_email}</div>
            </Form.Group>

            <Form.Group
              className="mb-3 fw-bold"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                className="shadow-none"
                name="branch"
                value={formData.company}
                onChange={onChangeHandler}
              />
              <div className="text-danger">{validationError?.company}</div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="flat" className="btn-medium" onClick={handleClose}>
            Close
          </Button>
          <Button variant="flat" className="btn-medium" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditClientModal;
