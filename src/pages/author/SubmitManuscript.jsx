import React, { useState, useEffect } from "react";
import { Stepper, Step } from "react-form-stepper";
import { MdDescription } from "react-icons/md";
import StepWizard from "react-step-wizard";
import { Row, Col, Button, FormGroup, Label, Input } from "reactstrap";
import Select from "react-select";
import ListGroup from "react-bootstrap/ListGroup";
import { BsFillFileEarmarkPdfFill, BsCardImage } from "react-icons/bs";
import { GrDocumentText } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { updateHeader } from "../../redux/slices/appInfoSlice";
import Axios from "../../utils/api";
import Axios2 from "../../utils/apiFormData";
import { useNavigate } from "react-router-dom";

const typeOfArticleOptions = [
  { value: "research paper", label: "Research Paper" },
  { value: "review article", label: "Review Article" },
  { value: "petroleum geology", label: "Petroleum Geology" },
  { value: "tarim basin geology", label: "Tarim Basin Geology" },
];

const ActionButtons = (props) => {
  const handleBack = () => {
    props.previousStep();
  };

  const handleNext = () => {
    props.nextStep();
  };

  const handleFinish = () => {
    props.lastStep();
  };

  return (
    <div className="mb-3">
      <Row>
        {props.currentStep > 1 && (
          <Col>
            <Button onClick={handleBack}>Back</Button>
          </Col>
        )}
        <Col>
          {props.currentStep < props.totalSteps && (
            <Button onClick={handleNext}>Next</Button>
          )}
          {props.currentStep === props.totalSteps && (
            <Button onClick={handleFinish}>Finish</Button>
          )}
        </Col>
      </Row>
    </div>
  );
};

const One = (props) => {
  const [info1, setInfo1] = useState({});
  const [error, setError] = useState("");
  const [reviewerOptions, setReviewerOptions] = useState([]);
  const onInputChanged = (event) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;

    setInfo1((info1) => ({
      ...info1,
      [targetName]: targetValue,
    }));
  };

  const validate = () => {
    console.log(
      props.formFields,
      props.formFields.reviewer.length,
      "from validate"
    );
    if (!props.formFields.articleType)
      setError("You must select article type and reviewer before proceeding");
    else if (!props.formFields.reviewer)
      setError("You must select article type and reviewer before proceeding");
    else {
      setError("");
      props.nextStep();
      props.userCallback(info1);
    }
  };

  useEffect(() => {
    const loadOptions = async () => {
      const response = await Axios.get("/users/reviewers");
      const modifiedReviewer = response.data.data.map((item) => {
        return {
          label: item.FirstName,
          value: item._id,
        };
      });
      setReviewerOptions(modifiedReviewer);
      console.log(response.data.data);
    };
    loadOptions();
  }, []);

  return (
    <div>
      <span style={{ color: "red" }}>{error}</span>
      <h1>This is step 1 content</h1>
      <FormGroup>
        <Label>Article Type: </Label>

        <Select
          name="articleType"
          options={typeOfArticleOptions}
          onChange={(e) => props.handleChange(e, "articleType")}
          value={props?.FormFields?.articleType}
          classNameName="basic-multi-select"
          classNameNamePrefix="select"
        />
      </FormGroup>
      <FormGroup>
        <Label> Reviewer: </Label>

        <Select
          name="reviewer"
          options={reviewerOptions}
          onChange={(e) => props.handleChange(e, "reviewer")}
          value={props?.FormFields?.reviewer}
          classNameName="basic-multi-select"
          classNameNamePrefix="select"
        />
      </FormGroup>
      <br />
      <ActionButtons {...props} nextStep={validate} />
    </div>
  );
};

const Two = (props) => {
  const [info2, setInfo2] = useState({});
  const [error, setError] = useState("");
  const [stepError, setStepError] = useState("");
  const [files, setFiles] = useState([]);

  const selectFileTypeIcon = (type) => {
    if (
      type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )
      return <GrDocumentText style={{ fontSize: "30px", color: "#fff" }} />;
    if (type === "application/pdf")
      return (
        <BsFillFileEarmarkPdfFill
          style={{ fontSize: "30px", color: "#8B0000" }}
        />
      );
    if (type === "image/jpeg")
      return <BsCardImage style={{ fontSize: "30px", color: "#ADD8E6" }} />;
  };

  const onInputChanged = (event) => {
    setStepError("");
    setError("");
    if (
      event.target.files[0].type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      event.target.files[0].type === "application/pdf" ||
      event.target.files[0].type === "image/jpeg"
    ) {
      const targetName = event.target.name;
      const targetValue = event.target.value;
      const newFile = props.formFields.files;
      newFile.push(event.target.files[0]);
      console.log(event.target.files[0]);
      props.setFormFields((prev) => ({ ...prev, files: newFile }));
      console.log(targetName, event.target.files[0]);

      setInfo2((info2) => ({
        ...info2,
        [targetName]: targetValue,
      }));
    } else {
      setError("Please,select only doc,pdf and jpeg files");
    }
  };

  const selectFileType = (type) => {
    if (
      type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )
      return "docx";
    if (type === "application/pdf") return "pdf";
    if (type === "image/jpeg") return "jpg";
  };

  const validate2 = () => {
    if (props.formFields.files.length < 1)
      setStepError("please select some files before proceeding");
    else {
      setStepError("");
      props.nextStep();
      props.userCallback(files);
    }
  };

  return (
    <div>
      <span style={{ color: "red" }}>{stepError}</span>
      <h1>Attach Files Related To Manuscript</h1>
      <FormGroup></FormGroup>

      <div classNameName="file-container">
        <FormGroup>
          <Label>Upload Files: </Label>
          <Input
            type="file"
            name="files"
            onChange={onInputChanged}
            className="custom-file-input shadow-none"
          />
          {error && <div className="text-danger">{error}</div>}
        </FormGroup>
      </div>
      <div className="table-container">
        <table className="table-local">
          <tbody>
            {props.formFields?.files?.length > 0 && (
              <tr>
                <th>Item</th>
                <th>File Name</th>
                <th>File Type</th>
                <th>File Size</th>
              </tr>
            )}

            {props.formFields?.files?.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <span>
                      {" "}
                      {selectFileTypeIcon(item?.type)}
                      {item?.name}
                    </span>
                  </td>
                  <td>{selectFileType(item?.type)}</td>
                  <td>{Math.ceil(item?.size / 1024) + "kb"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <br />
      <ActionButtons {...props} nextStep={validate2} />
    </div>
  );
};

const Three = (props) => {
  console.log("step3 receive user object");
  console.log(props.user);
  const { formFields } = props;
  const selectFileTypeIcon = (type) => {
    if (
      type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )
      return <GrDocumentText style={{ fontSize: "50px", color: "#fff" }} />;
    if (type === "application/pdf")
      return (
        <BsFillFileEarmarkPdfFill
          style={{ fontSize: "50px", color: "#8B0000" }}
        />
      );
    if (type === "image/jpeg")
      return <BsCardImage style={{ fontSize: "50px", color: "#ADD8E6" }} />;
  };
  const handleLastStep = () => {
    props.lastStep();
    props.completeCallback();
  };

  return (
    <div className="fw-bold">
      <h2>Summary </h2>
      <p>Article Type: {formFields?.articleType?.label}</p>
      <p>Reviewer:</p>
      {formFields.reviewer.length > 0 &&
        formFields?.reviewer?.map((item, i) => {
          return <div key={i}>{i + 1 + " " + item.label}</div>;
        })}
      <p>Selected Files:</p>
      <ListGroup style={{ maxWidth: "300px" }}>
        {formFields?.files?.map((item, i) => {
          return (
            <ListGroup.Item key={i} style={{ marginTop: "20px" }}>
              {selectFileTypeIcon(item.type)}
              {item.name}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      {props.successMessage && (
        <div className="text-success">{props.successMessage}</div>
      )}
      <br />
      <ActionButtons {...props} lastStep={handleLastStep} />
    </div>
  );
};

const Sample = () => {
  const [stepWizard, setStepWizard] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [formFields, setFormFields] = useState({
    articleType: "",
    files: [],
    reviewer: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateHeader("New Manuscript"));
  }, []);

  const assignStepWizard = (instance) => {
    setStepWizard(instance);
  };

  const assignUser = (val) => {
    console.log("parent receive user callback");
    console.log(val);
    setUser((user) => ({
      ...user,
      ...val,
    }));
  };

  const handleStepChange = (e) => {
    console.log("step change");
    console.log(e);
    setActiveStep(e.activeStep - 1);
  };

  const handleChange = (e, type) => {
    console.log("inside handle change", e);

    setFormFields((prev) => ({ ...prev, [type]: e }));
  };
  console.log(formFields);

  const handleComplete = async () => {
    const formData = new FormData();
    let newArr = [];
    for (let i = 0; i < formFields.files.length; i++) {
      // console.log(formFields.files[i]);
      // newArr.push(formFields.files[i]);
      formData.append("files", formFields.files[i]);
    }
    const user = JSON.parse(localStorage.getItem("user"));
    formData.append("articleType", formFields?.articleType?.value);
    formData.append("author", user._id);
    formData.append("reviewer", formFields?.reviewer?.value);

    console.log("here is form data", formData);
    try {
      const response = await Axios2.post("users/uploadDocuments", formData);
      setSuccessMessage("file uploaded successfully");
      setTimeout(() => {
        navigate("/author/revisions");
      }, 2000);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        <Step label="Article Type Selection" children={<MdDescription />} />
        <Step label="Attach File" />
        <Step label="Manuscript Data" />
      </Stepper>
      {/* NOTE: IMPORTANT !! StepWizard must contains at least 2 children components, else got error */}
      <StepWizard instance={assignStepWizard} onStepChange={handleStepChange}>
        <One
          userCallback={assignUser}
          formFields={formFields}
          handleChange={handleChange}
        />
        <Two
          user={user}
          userCallback={assignUser}
          formFields={formFields}
          setFormFields={setFormFields}
        />
        <Three
          user={user}
          completeCallback={handleComplete}
          formFields={formFields}
          successMessage={successMessage}
        />
      </StepWizard>
    </div>
  );
};

export default Sample;
