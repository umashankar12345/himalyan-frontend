import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import Pagination from "../../../components/Pagination";
import { BsFillEyeFill } from "react-icons/bs";
import { MdEdit, MdBlock } from "react-icons/md";
import AddClientModal from "../../../components/modals/clients/AddClientModal";
import EditClientModal from "../../../components/modals/clients/EditClientModal";
import BlockModal from "../../../components/modals/BlockModal";
import { useNavigate } from "react-router-dom";
import Axios from "../../../utils/api";
function Projects() {
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showEditClientModal, setShowEditClientModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const getData = async () => {
    try {
      const response = await Axios.get(`/admin/clients`);
      console.log(response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Wrapper>
      <AddClientModal
        show={showAddClientModal}
        setShow={setShowAddClientModal}
      />
      <EditClientModal
        show={showEditClientModal}
        setShow={setShowEditClientModal}
      />
      <BlockModal show={showBlockModal} setShow={setShowBlockModal} />
      <div className="d-flex justify-content-end">
        <div
          className="fw-bold btn-medium"
          onClick={() => setShowAddClientModal(true)}
        >
          Add Client +
        </div>
      </div>
      <div className="table-container">
        <table className="table-local">
          <tbody>
            <tr>
              <th>Client Name</th>
              <th>Client Email</th>
              <th>Client Address</th>
              <th>Status</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>

            {data?.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item?.client_name}</td>
                  <td>{item?.client_email}</td>
                  <td>{item?.client_address}</td>
                  <td>{item?.status ? "Active" : "Not Active"}</td>
                  <td>{item?.company}</td>
                  <td>
                    <BsFillEyeFill
                      className="me-1 cursor-pointer"
                      onClick={() =>
                        navigate(`/admin/view-project/${item._id}`)
                      }
                    />{" "}
                    <MdEdit
                      className="me-1 cursor-pointer"
                      onClick={() => setShowEditClientModal(true)}
                    />
                    <MdBlock
                      className="me-1 cursor-pointer"
                      onClick={() => setShowBlockModal(true)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination onPageChange={() => console.log("abc")} total={10} page={2} />
    </Wrapper>
  );
}

export default Projects;
const Wrapper = Styled.div`

 
`;
