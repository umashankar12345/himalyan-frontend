import { updateHeader } from "../../redux/slices/appInfoSlice";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import { BsFillEyeFill } from "react-icons/bs";
import { MdEdit, MdBlock } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "../../utils/api";
import { BsFillFileEarmarkPdfFill, BsCardImage } from "react-icons/bs";
import { GrDocumentText } from "react-icons/gr";

function Revisions() {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);

  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showEditClientModal, setShowEditClientModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const getData = async () => {
    try {
      const response = await Axios.get(`/users/feedback?_id=${id}`);
      console.log(response.data.data);
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

  useEffect(() => {
    dispatch(updateHeader("Feedbacks"));
    getData();
  }, []);

  return (
    <Wrapper>
      <div className="table-container">
        <div>
          <h1>file submitted</h1>
          <div>
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

            <div>
              <h1 className="h3 fw-bold">Status:</h1>

              {data?.status ? (
                <h1 className="text-green h3"> Approved</h1>
              ) : (
                <h1 className="text-danger h3">Not Approved</h1>
              )}
            </div>

            <div className="mt-4">
              <h2 className="fw-bold">Reviewer Comments</h2>
              {data?.comment ? (
                <textarea
                  name=""
                  id=""
                  cols="10"
                  rows="10"
                  value={data.comment}
                  className="w-100"
                  disabled
                ></textarea>
              ) : (
                <textarea
                  name=""
                  id=""
                  cols="10"
                  rows="10"
                  className="w-100"
                  value="no comments yet"
                  disabled
                ></textarea>
              )}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Revisions;

const Wrapper = Styled.div`

 
`;
