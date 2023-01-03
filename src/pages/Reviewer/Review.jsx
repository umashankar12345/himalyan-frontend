import { useNavigate, useLocation, useParams } from "react-router-dom";
// import Editor from "./Editor";
import Editor from "./Editor";
import { updateHeader } from "../../redux/slices/appInfoSlice";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import { BsFillEyeFill } from "react-icons/bs";
import { MdEdit, MdBlock } from "react-icons/md";
import Axios from "../../utils/api";
import { BsFillFileEarmarkPdfFill, BsCardImage } from "react-icons/bs";
import { GrDocumentText } from "react-icons/gr";
const initialFormFields = {
  option1: false,
  option2: false,
  option3: false,
  option4: false,
  option5: false,
  option6: false,
  option7: false,
  option8: false,
  option9: false,
  option10: false,
  option11: false,
  comment: "",
};
function Reviewer() {
  const [formFields, setFormFields] = useState(initialFormFields);
  const [successMessage, setSuccessMessage] = useState("");
  const [data, setData] = useState("");
  const { id } = useParams();
  console.log("id from review", id);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(formFields);
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormFields((prev) => ({
      ...prev,
      [name]: value === "true" ? true : false,
    }));
  };
  const getData = async () => {
    try {
      const response = await Axios.get(`/users/reviewInvite?_id=${id}`);
      console.log(response.data.data);
      const {
        option1,
        option2,
        option3,
        option4,
        option5,
        option6,
        option7,
        option8,
        option9,
        option10,
        option11,
        comment,
      } = response.data.data;
      console.log(comment, "comment asdfsf");
      setFormFields({
        option1,
        option2,
        option3,
        option4,
        option5,
        option6,
        option7,
        option8,
        option9,
        option10,
        option11,
        comment,
      });
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const selectFileTypeIcon = (type) => {
    if (type.file_name.indexOf("docx") > -1)
      return <GrDocumentText style={{ fontSize: "30px", color: "#fff" }} />;
    if (type.file_name.indexOf("pdf") > -1)
      return (
        <BsFillFileEarmarkPdfFill
          style={{ fontSize: "30px", color: "#8B0000" }}
        />
      );
    if (type.file_name.indexOf("jpg") > -1)
      return <BsCardImage style={{ fontSize: "30px", color: "#ADD8E6" }} />;
  };

  const submitHandler = async () => {
    try {
      const response = await Axios.post(`/users/submitReview`, {
        ...formFields,
        _id: id,
      });
      console.log(response.data.data);
      setSuccessMessage("review submitted successfully");
      setTimeout(() => {
        navigate("/reviewer/review");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(updateHeader("Review Detail"));
    getData();
  }, []);

  console.log(location);
  return (
    <div>
      <h1 className="h3 fw-bold">file submitted</h1>

      <div>
        {data?.files?.map((item, i) => {
          return (
            <div key={i} className="mb-2">
              {i + 1 + "." + " "}
              {selectFileTypeIcon(item)}
              {item.file_name}
              <a
                href={item.file_path}
                className="btn btn-pill btn-dark ms-3"
                target="_blank"
              >
                Open/Download File
              </a>
            </div>
          );
        })}
      </div>

      <div className="heading">
        <h3>Please,select the option whichever you think is true:-</h3>
        <div className="heading-underline"></div>
      </div>
      <div className="review-options">
        <label htmlFor="AvailableAsReviewer" className="mb-2">
          1. Should the author(s) include more background information?
        </label>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="option1"
            value={true}
            checked={formFields.option1 === true}
            onChange={onChangeHandler}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Yes
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="option1"
            id="flexRadioDefault2"
            value={false}
            checked={formFields.option1 === false}
            onChange={onChangeHandler}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            No
          </label>
        </div>
      </div>
      <div className="review-options">
        <label htmlFor="AvailableAsReviewer" className="mb-2">
          2.Should the manuscript be expanded/more detailed?
        </label>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="option2"
            value={true}
            checked={formFields.option2 === true}
            onChange={onChangeHandler}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Yes
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="option2"
            id="flexRadioDefault2"
            value={false}
            checked={formFields.option2 === false}
            onChange={onChangeHandler}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            No
          </label>
        </div>
      </div>
      <div className="review-options">
        <label htmlFor="AvailableAsReviewer" className="mb-2">
          3. Is the paper too long for the material presented?
        </label>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="option3"
            value={true}
            checked={formFields.option3 === true}
            onChange={onChangeHandler}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Yes
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="option3"
            id="flexRadioDefault2"
            value={false}
            checked={formFields.option3 === false}
            onChange={onChangeHandler}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            No
          </label>
        </div>
      </div>
      <div className="review-options">
        <label htmlFor="AvailableAsReviewer" className="mb-2">
          4. Is the manuscript is acceptable in its present form?
        </label>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="option4"
            value={true}
            checked={formFields.option4 === true}
            onChange={onChangeHandler}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Yes
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="option4"
            id="flexRadioDefault2"
            value={false}
            checked={formFields.option4 === false}
            onChange={onChangeHandler}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            No
          </label>
        </div>
      </div>
      <div className="review-options">
        <label htmlFor="AvailableAsReviewer" className="mb-2">
          5.Is the manuscript acceptable with minor corrections?
        </label>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="option5"
            value={true}
            checked={formFields.option5 === true}
            onChange={onChangeHandler}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Yes
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="option5"
            id="flexRadioDefault2"
            value={false}
            checked={formFields.option5 === false}
            onChange={onChangeHandler}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            No
          </label>
        </div>
      </div>
      <div className="review-options">
        <label htmlFor="AvailableAsReviewer" className="mb-2">
          6. Is the manuscript acceptable after some revision?
        </label>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="option6"
            value={true}
            checked={formFields.option6 === true}
            onChange={onChangeHandler}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Yes
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="option6"
            id="flexRadioDefault2"
            value={false}
            checked={formFields.option6 === false}
            onChange={onChangeHandler}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            No
          </label>
        </div>
      </div>
      <div className="review-options">
        <label htmlFor="AvailableAsReviewer" className="mb-2">
          7. Is the manuscript acceptable after major revision and must be
          reviewed again?
        </label>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="option7"
            value={true}
            checked={formFields.option7 === true}
            onChange={onChangeHandler}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Yes
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="option7"
            id="flexRadioDefault2"
            value={false}
            checked={formFields.option7 === false}
            onChange={onChangeHandler}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            No
          </label>
        </div>
      </div>
      <div className="review-options">
        <label htmlFor="AvailableAsReviewer" className="mb-2">
          8. Should the author(s) include more background information?
        </label>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="option8"
            value={true}
            checked={formFields.option8 === true}
            onChange={onChangeHandler}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Yes
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="option8"
            id="flexRadioDefault2"
            value={false}
            checked={formFields.option8 === false}
            onChange={onChangeHandler}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            No
          </label>
        </div>
      </div>
      <div className="review-options">
        <label htmlFor="AvailableAsReviewer" className="mb-2">
          9. Would I willing to review the paper again?
        </label>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="option9"
            value={true}
            checked={formFields.option9 === true}
            onChange={onChangeHandler}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Yes
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="option9"
            id="flexRadioDefault2"
            value={false}
            checked={formFields.option9 === false}
            onChange={onChangeHandler}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            No
          </label>
        </div>
      </div>
      <div className="review-options">
        <label htmlFor="AvailableAsReviewer" className="mb-2">
          10. Is the manuscript acceptable?
        </label>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="option10"
            value={true}
            checked={formFields.option10 === true}
            onChange={onChangeHandler}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Yes
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="option10"
            id="flexRadioDefault2"
            value={false}
            checked={formFields.option10 === false}
            onChange={onChangeHandler}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            No
          </label>
        </div>
      </div>

      <div className="heading mb-3">
        <h3>Reviewer comments to author</h3>
        <div className="heading-underline"></div>
      </div>
      {}
      <div
        style={{
          width: "100%",
          height: "300px",
          // border: "2px solid red",
          marginBottom: "20px",
        }}
      >
        {/* <Editor formFields={formFields} setFormFields={setFormFields} /> */}
        <textarea
          name="comment"
          value={formFields?.comment}
          cols="30"
          rows="10"
          className="w-100"
          onChange={(e) =>
            setFormFields((prev) => ({ ...prev, comment: e.target.value }))
          }
        />
      </div>
      {successMessage && (
        <div className="text-success text-center">{successMessage}</div>
      )}

      <div className="d-flex justify-content-center">
        <button onClick={submitHandler} className="btn btn-dark mb-3">
          {" "}
          Submit Review
        </button>
      </div>
    </div>
  );
}

export default Reviewer;
