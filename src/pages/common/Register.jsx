import React, { useState } from "react";
import Styled from "styled-components";
import Form from "react-bootstrap/Form";
import Axios from "../../utils/api";
import { reviewer, author } from "../../redux/slices/appInfoSlice";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
const initialFormFields = {
  Title: "",
  FirstName: "",
  LastName: "",
  MiddleName: "",
  email: "",
  password: "",
  ConfirmPassword: "",
  Degree: "",
  PreferedName: "",
  Position: "",
  Institution: "",
  Department: "",
  StreetAddress1: "",
  StreetAddress2: "",
  City: "",
  State: "",
  Zip: "",
  Region: "",
  Phone: "",
  AvailableasaReviewer: false,
};

function Register() {
  const [formFields, setFormFields] = useState(initialFormFields);
  const [validationError, setValidationError] = useState(initialFormFields);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (validateFormFields()) {
      try {
        console.log("inside submit handler");
        let role;
        if (formFields.AvailableasaReviewer) {
          role = "reviewer";
        } else role = "author";
        const response = await Axios.post("/users/register", {
          ...formFields,
          role: role,
        });
        console.log(response);
        localStorage.setItem("user", response.data.user);
        localStorage.setItem("token", response.data.token);
        setSuccessMessage("Successfully registered");
        setFormFields(initialFormFields);
        setTimeout(() => {
          if (role === "author") {
            dispatch(author());
            navigate("/author");
          } else {
            dispatch(reviewer());
            navigate("/reviewer");
          }
        }, 3000);

        console.log(response);
      } catch (error) {}
    }
  };

  const validateFormFields = () => {
    setValidationError(initialFormFields);
    let error = {};
    const formFieldsKeys = Object.keys(formFields);
    const formFieldsValues = Object.values(formFields);
    console.log(formFieldsKeys, formFieldsValues, "asfsafa");
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]+)*$/;
    for (var i = 0; i < formFieldsKeys.length; i++) {
      if (formFieldsKeys[i] === "AvailableasaReviewer") continue;
      if (formFieldsKeys[i] === "email" && !regex.test(formFieldsValues[i]))
        error[formFieldsKeys[i]] = "Please Enter a valid email";
      if (!formFieldsValues[i]) {
        error[formFieldsKeys[i]] = formFieldsKeys[i] + " is " + "Required";
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

  return (
    <Wrapper>
      <div className=" mt-3 ">
        {/* <div className="col-md-2">asf</div> */}
        <form onSubmit={submitHandler}>
          <div className="col-md-8 form-container p-3">
            <div className="heading">
              <h3>Personal Information</h3>
              <div className="heading-underline"></div>
            </div>

            <div className="d-flex justify-content-between">
              <Form.Group className="single-box">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="Title"
                  value={formFields.Title}
                  onChange={onChangeHandler}
                  placeholder="Enter your Name"
                />
                <div className="text-danger">{validationError?.Title}</div>
              </Form.Group>
              <Form.Group className="single-box">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your first name"
                  name="FirstName"
                  value={formFields.FirstName}
                  onChange={onChangeHandler}
                />
                <div className="text-danger">{validationError?.FirstName}</div>
              </Form.Group>
            </div>
            <div className="d-flex justify-content-between">
              <Form.Group className="single-box">
                <Form.Label>Middle Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your Middle Name"
                  name="MiddleName"
                  value={formFields.MiddleName}
                  onChange={onChangeHandler}
                />
                <div className="text-danger">{validationError?.MiddleName}</div>
              </Form.Group>
              <Form.Group className="single-box">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your Last Name"
                  name="LastName"
                  value={formFields.LastName}
                  onChange={onChangeHandler}
                />
                <div className="text-danger">{validationError?.LastName}</div>
              </Form.Group>
            </div>
            <div className="d-flex justify-content-between">
              <Form.Group className="single-box">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your Email"
                  name="email"
                  value={formFields.email}
                  onChange={onChangeHandler}
                />
                <div className="text-danger">{validationError?.email}</div>
              </Form.Group>
              <Form.Group className="single-box">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="eg.+91.....(include country code also)"
                  name="Phone"
                  value={formFields.Phone}
                  onChange={onChangeHandler}
                />
                <div className="text-danger">{validationError?.Phone}</div>
              </Form.Group>
            </div>

            <div className="d-flex justify-content-between">
              <Form.Group className="single-box">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your Password"
                  name="password"
                  value={formFields.password}
                  onChange={onChangeHandler}
                />
                <div className="text-danger">{validationError?.password}</div>
              </Form.Group>
              <Form.Group className="single-box">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm  your password"
                  name="ConfirmPassword"
                  value={formFields.ConfirmPassword}
                  onChange={onChangeHandler}
                />
                <div className="text-danger">
                  {validationError?.ConfirmPassword}
                </div>
              </Form.Group>
            </div>
            <div className="d-flex justify-content-between">
              <Form.Group className="single-box">
                <Form.Label>Prefered Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="nickname"
                  name="PreferedName"
                  value={formFields.PreferedName}
                  onChange={onChangeHandler}
                />
                <div className="text-danger">
                  {validationError?.PreferedName}
                </div>
              </Form.Group>
              <Form.Group className="single-box">
                <Form.Label>Degree</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="eg.Msc,b.sc,b.tech"
                  name="Degree"
                  value={formFields.Degree}
                  onChange={onChangeHandler}
                />
                <div className="text-danger">{validationError?.Degree}</div>
              </Form.Group>
            </div>
            <div className="">
              <label htmlFor="AvailableAsReviewer" className="mb-2">
                Available As Reviewer
              </label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="AvailableasaReviewer"
                  id="flexRadioDefault1"
                  checked={formFields.AvailableasaReviewer === true}
                  onChange={() =>
                    setFormFields((prev) => ({
                      ...prev,
                      AvailableasaReviewer: true,
                    }))
                  }
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Yes
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="AvailableasaReviewer"
                  id="flexRadioDefault2"
                  checked={formFields.AvailableasaReviewer === false}
                  onChange={() =>
                    setFormFields((prev) => ({
                      ...prev,
                      AvailableasaReviewer: false,
                    }))
                  }
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  No
                </label>
              </div>
            </div>
            <div className="heading">
              <h3>Institution Related Information</h3>
              <div className="heading-underline"></div>
            </div>

            <div className="d-flex justify-content-between">
              <Form.Group className="single-box">
                <Form.Label>Position</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Position"
                  name="Position"
                  value={formFields.Position}
                  onChange={onChangeHandler}
                />
                <div className="text-danger">{validationError?.Position}</div>
              </Form.Group>
              <Form.Group className="single-box">
                <Form.Label>Institution</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your institute Name"
                  name="Institution"
                  value={formFields.Institution}
                  onChange={onChangeHandler}
                />
                <div className="text-danger">
                  {validationError?.Institution}
                </div>
              </Form.Group>
            </div>
            <div className="d-flex justify-content-between">
              <Form.Group className="single-box">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Department"
                  name="Department"
                  value={formFields.Department}
                  onChange={onChangeHandler}
                />
                <div className="text-danger">{validationError?.Department}</div>
              </Form.Group>
              <Form.Group className="single-box">
                <Form.Label>city</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  name="City"
                  value={formFields.City}
                  onChange={onChangeHandler}
                />
                <div className="text-danger">{validationError?.City}</div>
              </Form.Group>
            </div>
            <div className="d-flex justify-content-between">
              <Form.Group className="single-box">
                <Form.Label>Street Address</Form.Label>
                <Form.Control
                  type="text"
                  className="mb-2"
                  placeholder="Street Address 1"
                  name="StreetAddress1"
                  value={formFields.StreetAddress1}
                  onChange={onChangeHandler}
                />
                <div className="text-danger">
                  {validationError?.StreetAddress1}
                </div>
                <Form.Control
                  type="text"
                  className="mb-2"
                  placeholder="Street Address 2"
                  name="StreetAddress2"
                  value={formFields.StreetAddress2}
                  onChange={onChangeHandler}
                />
                <div className="text-danger">
                  {validationError?.StreetAddress2}
                </div>
              </Form.Group>
            </div>

            <div className="d-flex justify-content-between">
              <Form.Group className="single-box">
                <Form.Label>zip/postalcode</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your zip"
                  name="Zip"
                  value={formFields.Zip}
                  onChange={onChangeHandler}
                />
                <div className="text-danger">{validationError?.Zip}</div>
              </Form.Group>
              <Form.Group className="single-box">
                <Form.Label>country/Region</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your country"
                  name="Region"
                  value={formFields.Region}
                  onChange={onChangeHandler}
                />
                <div className="text-danger">{validationError?.Region}</div>
              </Form.Group>
            </div>
            <div className="d-flex justify-content-between">
              <Form.Group className="single-box">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your state"
                  name="State"
                  value={formFields.State}
                  onChange={onChangeHandler}
                />
                <div className="text-danger">{validationError?.State}</div>
              </Form.Group>
            </div>
            {successMessage && (
              <div className="text-success text-center mb-2">
                {successMessage}
              </div>
            )}
            <div className="d-flex justify-content-center mt-3 ">
              <button type="submit" className="btn-reg">
                Submit
              </button>
            </div>
          </div>
        </form>

        {/* <div className="col-md-2">asf</div> */}
      </div>
    </Wrapper>
  );
}

export default Register;

const Wrapper = Styled.div`
    max-width:100%;
    .form-container{
        background:#EEEEEE;
        max-width:700px;
        margin:0px auto;
     box-shadow:none;
       
        
    }
    .heading{
        margin-top:10px;
       
    }
    .heading-underline{
      width:100px;
      height:5px;
      background-color:black; 
      margin-bottom:10px;
    }
    .single-box{
        width:300px;
        margin:5px;
        font-weight:bold;
    }
    .form-control{
     box-shadow:none;
    }
`;
