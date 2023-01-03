import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import Axios from "../../../utils/api";

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "team_lead", label: "Team Lead" },
  { value: "pcpm", label: "PcPm" },
  { value: "user", label: "User" },
];
const locationOptions = [
  { value: "noida", label: "noida" },
  { value: "dehradun", label: "dehradun" },
];
const userRoleOptions = [
  { value: "member", label: "Member" },
  { value: "team_lead", label: "Team Lead" },
];

const initialOptions = {
  role_options: roleOptions,
  location_options: locationOptions,
};
const initialFormData = {
  role: "",
  name: "",
  emp_id: "",
  email: "",
  location: "",
  password: "",
  reporting_to: "",
};
const initialValidationErrorFields = {
  role: "",
  name: "",
  emp_id: "",
  email: "",
  location: "",
  password: "",
  reporting_to: "",
};

function AddResourceModal({ show, setShow, refreshPage, setRefreshPage }) {
  //   const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [options, setOptions] = useState(initialOptions);
  const [validationError, setValidationError] = useState(
    initialValidationErrorFields
  );
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = (selectedOption, type) => {
    console.log(selectedOption, type);

    setFormData((prev) => ({ ...prev, [type]: selectedOption }));
  };

  const validateFormFields = () => {
    setValidationError(initialValidationErrorFields);
    let error = {};
    const formDataKeys = Object.keys(formData);
    const formDataValues = Object.values(formData);
    console.log(formDataKeys, formDataValues, "asfsafa");
    for (var i = 0; i < formDataKeys.length; i++) {
      if (!formDataValues[i]) {
        error[formDataKeys[i]] = "Required";
      }
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
      const dataToSend = {
        ...formData,
        role: formData.role.value,
        location: formData.location.value,
      };
      const response = await Axios.post("/admin/addResource", dataToSend);
      console.log(response);
      setShow(false);
      setRefreshPage(!refreshPage);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Resource</Modal.Title>
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
                name="name"
                value={formData.name}
                onChange={onChangeHandler}
              />
              <div className="text-danger">{validationError?.name}</div>
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
                name="emp_id"
                value={formData.emp_id}
                onChange={onChangeHandler}
              />
              <div className="text-danger">{validationError?.emp_id}</div>
            </Form.Group>
            <Form.Group
              className="mb-3 fw-bold"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder=""
                className="shadow-none"
                name="email"
                value={formData.email}
                onChange={onChangeHandler}
              />
              <div className="text-danger">{validationError?.email}</div>
            </Form.Group>

            <Form.Group
              className="mb-3 fw-bold"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Branch</Form.Label>
              <Select
                name="location"
                options={options.location_options}
                onChange={(e) => handleChange(e, "location")}
                className="basic-multi-select"
                classNamePrefix="select"
              />
              <div className="text-danger">{validationError?.location}</div>
            </Form.Group>

            <Form.Group className="mb-3 fw-bold">
              <Form.Label>Role</Form.Label>
              <Select
                name="role"
                options={options.role_options}
                onChange={(e) => handleChange(e, "role")}
                className="basic-multi-select"
                classNamePrefix="select"
              />
              <div className="text-danger">{validationError?.role}</div>
              {/* <div className="text-danger">{validationError?.client}</div> */}
            </Form.Group>

            <Form.Group
              className="mb-3 fw-bold"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                className="shadow-none"
                name="password"
                value={formData.password}
                onChange={onChangeHandler}
              />
              <div className="text-danger">{validationError?.password}</div>
            </Form.Group>

            <Form.Group
              className="mb-3 fw-bold"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Reporting To</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                className="shadow-none"
                name="reporting_to"
                value={formData.reporting_to}
                onChange={onChangeHandler}
              />
              <div className="text-danger">{validationError?.reporting_to}</div>
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

export default AddResourceModal;
