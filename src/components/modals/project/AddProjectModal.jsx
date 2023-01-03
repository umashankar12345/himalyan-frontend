import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import Axios from "../../../utils/api";

const typeOfPlatformOptions = [
  { value: "linkedin", label: "Linkedin" },
  { value: "upwork", label: "Upwork" },
  { value: "fiver", label: "Fiver" },
  { value: "other", label: "other" },
];
const typeOfProjectOptions = [
  { value: "tnm", label: "Tnm" },
  { value: "dedicated", label: "Dedicated" },
  { value: "fixed bid", label: "fixed bid" },
];
const shiftOptions = [
  { value: "day shift", label: "day shift" },
  { value: "night shift", label: "night shift" },
];

const initialOptions = {
  type_of_platform_options: typeOfPlatformOptions,
  type_of_project_options: typeOfProjectOptions,
  shift_options: shiftOptions,
  technology_options: [],
  client_options: [],
};

const initialFormData = {
  project_name: "",
  resources: "",
  resources_options: [],
  type_of_project: "",
  type_of_project_options: typeOfProjectOptions,
  type_of_platform: "",
  type_of_platform_options: typeOfPlatformOptions,
  min_hrs: "",
  max_hrs: "",
  technology_options: [],
  upwork_profile: "",
  project_manager: "",
  technology: "",
  client: "",
  client_options: [],
  region: "",
  project_start_date: "",
};

const initialValidationErrorFields = {
  project_name: "",
  resources: "",
  type_of_project: "",
  type_of_platform: "",
  min_hrs: "",
  max_hrs: "",
  upwork_profile: "",
  project_manager: "",
  client: "",
  technology: "",
  region: "",
  shift: "",
  access_right: "",
  project_start_date: "",
};
function AddProjectModal({ show, setShow, refreshPage, setRefreshPage }) {
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

  const validateFormFields = () => {
    setValidationError(initialValidationErrorFields);
    let error = {};
    const {
      project_name,
      client,
      resources,
      type_of_project,
      type_of_platform,
      min_hrs,
      max_hrs,
      technology,
      upwork_profile,
      project_manager,
      region,
      project_start_date,
    } = formData;
    console.log("client", client);
    if (!project_name) {
      error.project_name = "Required";
    }
    if (!project_start_date) {
      error.project_start_date = "Required";
    }
    if (!client) {
      error.client = "Required";
    }
    if (!region) {
      error.region = "Required";
    }
    if (!resources) {
      error.resources = "Required";
    }
    if (!type_of_project) {
      error.type_of_project = "Required";
    }
    if (!type_of_platform) {
      error.type_of_platform = "Required";
    }
    if (!min_hrs) {
      error.min_hrs = "Required";
    }
    if (!max_hrs) {
      error.max_hrs = "Required";
    }
    if (technology === undefined || technology === "") {
      console.log("technology error");
      error.technology = "Required";
    }
    if (!upwork_profile) {
      error.upwork_profile = "Required";
    }
    if (!min_hrs) {
      error.min_hrs = "Required";
    }
    if (!max_hrs) {
      error.max_hrs = "Required";
    }
    if (!project_manager) {
      error.project_manager = "Required";
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
      console.log(formData);
      const {
        project_name,
        client,
        resources,
        technology,
        region,
        type_of_project,
        type_of_platform,
        project_start_date,
        project_manager,
        min_hrs,
        max_hrs,
        status,
      } = formData;
      const dataToSend = {
        project_name,
        client,
        resources,
        technology,
        region,
        type_of_project,
        type_of_platform,
        project_start_date,
        project_manager,
        min_hrs,
        max_hrs,
        status,
      };
      const response = await Axios.post("/admin/addProject", dataToSend);
      console.log(response);
      setShow(false);
      setRefreshPage(!refreshPage);
    }
  };

  const loadOptionsData = async () => {
    try {
      const clientResponse = await Axios.get("/admin/clients");
      const modifiedClientResponse = clientResponse.data.data.map((item) => ({
        value: item._id,
        label: item.client_name,
      }));
      const technologyResponse = await Axios.get("/admin/technologies");
      const modifiedTechnologyResponse = technologyResponse.data.data.map(
        (item) => ({
          value: item._id,
          label: item.name,
        })
      );
      const resourceResponse = await Axios.get(
        "/admin/resourcesWithoutPagination"
      );
      const modifiedResourceResponse = resourceResponse.data.data.map(
        (item) => ({
          value: item._id,
          label: item.name,
        })
      );
      setOptions((prev) => ({
        ...prev,
        client_options: modifiedClientResponse,
        technology_options: modifiedTechnologyResponse,
        resources_options: modifiedResourceResponse,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (selectedOption, type) => {
    console.log(selectedOption, type);
    let selectedOptionValue;

    if (!selectedOption.length >= 1) selectedOptionValue = selectedOption.value;
    else {
      selectedOptionValue = selectedOption.map((item) => {
        console.log(item);
        return item.value;
      });
    }

    console.log(selectedOptionValue);
    setFormData((prev) => ({ ...prev, [type]: selectedOptionValue }));
  };

  useEffect(() => {
    loadOptionsData();
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3 fw-bold">
              <Form.Label>Client Name</Form.Label>
              <Select
                name="client"
                options={options.client_options}
                onChange={(e) => handleChange(e, "client")}
                className="basic-multi-select"
                classNamePrefix="select"
              />
              <div className="text-danger">{validationError?.client}</div>
            </Form.Group>
            <Form.Group className="mb-3 fw-bold">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                autoFocus
                className="shadow-none"
                name="project_name"
                value={formData.project_name}
                onChange={onChangeHandler}
              />
              <div className="text-danger">{validationError?.project_name}</div>
            </Form.Group>
            <Form.Group className="mb-3 fw-bold">
              <Form.Label>Technology</Form.Label>
              <Select
                isMulti
                name="technology"
                options={options.technology_options}
                onChange={(e) => handleChange(e, "technology")}
                className="basic-multi-select"
                classNamePrefix="select"
              />
              <div className="text-danger">{validationError?.technology}</div>
            </Form.Group>
            <Form.Group className="mb-3 fw-bold">
              <Form.Label>Resources</Form.Label>
              <Select
                isMulti
                name="resources"
                options={options.resources_options}
                onChange={(e) => handleChange(e, "resources")}
                className="basic-multi-select"
                classNamePrefix="select"
              />
              <div className="text-danger">{validationError?.resources}</div>
            </Form.Group>
            <Form.Group className="mb-3 fw-bold">
              <Form.Label>Project Manager</Form.Label>
              <Select
                name="project_manager"
                options={options.resources_options}
                onChange={(e) => handleChange(e, "project_manager")}
                className="basic-multi-select"
                classNamePrefix="select"
              />
              <div className="text-danger">
                {validationError?.project_manager}
              </div>
            </Form.Group>

            <Form.Group className="mb-3 fw-bold">
              <Form.Label>Type Of Projects</Form.Label>
              <Select
                name="type_of_project"
                options={options.type_of_project_options}
                onChange={(e) => handleChange(e, "type_of_project")}
                className="basic-multi-select"
                classNamePrefix="select"
              />
              <div className="text-danger">
                {validationError?.type_of_project}
              </div>
            </Form.Group>

            <Form.Group className="mb-3 fw-bold">
              <Form.Label>Type Of Platform</Form.Label>
              <Select
                name="type_of_platform"
                options={options.type_of_platform_options}
                onChange={(e) => handleChange(e, "type_of_platform")}
                className="basic-multi-select"
                classNamePrefix="select"
              />
              <div className="text-danger">
                {validationError?.type_of_platform}
              </div>
            </Form.Group>
            <Form.Group className="mb-3 fw-bold">
              <Form.Label>Region</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                className="shadow-none"
                name="region"
                value={formData.region}
                onChange={onChangeHandler}
              />
              <div className="text-danger">{validationError?.region}</div>
            </Form.Group>

            <Form.Group className="mb-3 fw-bold">
              <Form.Label>Active Profile</Form.Label>
              <Select
                name="upwork_profile"
                options={options.resources_options}
                onChange={(e) => handleChange(e, "upwork_profile")}
                className="basic-multi-select"
                classNamePrefix="select"
              />
              <div className="text-danger">
                {validationError?.project_manager}
              </div>
            </Form.Group>
            <Form.Group className="mb-3 fw-bold">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                placeholder=""
                className="shadow-none"
                name="project_start_date"
                value={formData.project_start_date}
                onChange={onChangeHandler}
              />
              <div className="text-danger">
                {validationError?.project_start_date}
              </div>
            </Form.Group>

            <Form.Group className="mb-3 fw-bold">
              <Form.Label>Min Time</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                className="shadow-none"
                name="min_hrs"
                value={formData.min_hrs}
                onChange={onChangeHandler}
              />
              <div className="text-danger">{validationError?.min_hrs}</div>
            </Form.Group>

            <Form.Group className="mb-3 fw-bold">
              <Form.Label>Max Time</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                className="shadow-none"
                name="max_hrs"
                value={formData.max_hrs}
                onChange={onChangeHandler}
              />
              <div className="text-danger">{validationError?.max_hrs}</div>
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

export default AddProjectModal;
