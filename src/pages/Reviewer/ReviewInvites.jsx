import { updateHeader } from "../../redux/slices/appInfoSlice";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import { BsFillEyeFill } from "react-icons/bs";
import { MdEdit, MdBlock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Axios from "../../utils/api";

function Revisions() {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const getData = async () => {
    try {
      const response = await Axios.get(
        `/users/reviewInvites?_id=${
          JSON.parse(localStorage.getItem("user"))._id
        }`
      );
      console.log(response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(updateHeader("Review Invites"));
    getData();
  }, []);

  return (
    <Wrapper>
      <div className="table-container">
        <table className="table-local">
          <tbody>
            <tr>
              <th>S.No</th>
              <th>Article Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

            {data?.map((item, i) => {
              return (
                <tr key={item._id}>
                  <td>{i + 1}</td>
                  <td>{item?.articleType}</td>
                  <td>{item?.status ? "Approved" : "Pending for Approval"}</td>
                  <td className="text-center">
                    View Details
                    <BsFillEyeFill
                      className="me-1 cursor-pointer"
                      onClick={() =>
                        navigate(`/reviewer/reviewDetails/${item._id}`)
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
}

export default Revisions;

const Wrapper = Styled.div`

 
`;
