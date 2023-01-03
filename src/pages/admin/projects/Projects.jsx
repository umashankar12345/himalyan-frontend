import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import Pagination from "../../../components/Pagination";
import { BsFillEyeFill } from "react-icons/bs";
import { MdEdit, MdBlock, MdSearch } from "react-icons/md";
import AddProjectModal from "../../../components/modals/project/AddProjectModal";
import EditProjectModal from "../../../components/modals/project/EditProjectModal";
import BlockModal from "../../../components/modals/BlockModal";
import { dashDate } from "../../../utils/date";
import { useNavigate } from "react-router-dom";
import Axios from "../../../utils/api";
import Loader from "../../../components/LoaderWave";
function Projects() {
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [selectedResource, setselectedResource] = useState("");
  const [selectedIdToEdit, setSelectedIdToEdit] = useState("");
  const [refreshPage, setRefreshPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const getData = async () => {
    try {
      setLoading(true);
      const response = await Axios.get(
        `/admin/projects?page=${page}&keyword=${search}`
      );
      console.log(response.data.data);
      setData(response.data.data);
      setTotalPage(response.data.total_pages || 1);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const changeProjectStatus = async () => {
    try {
      const { _id, status } = selectedResource;
      const response = await Axios.post(`/admin/changeResourceStatus`, {
        _id,
        status: !status,
      });
      setShowBlockModal(false);
      setRefreshPage(!refreshPage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const apiCall = setTimeout(() => {
      getData();
    }, 500);
    return () => clearTimeout(apiCall);
  }, [search, page, refreshPage]);
  return (
    <Wrapper>
      {loading && <Loader />}
      <AddProjectModal
        show={showAddProjectModal}
        setShow={setShowAddProjectModal}
        refreshPage={refreshPage}
        setRefreshPage={setRefreshPage}
      />
      <EditProjectModal
        show={showEditProjectModal}
        setShow={setShowEditProjectModal}
        refreshPage={refreshPage}
        setRefreshPage={setRefreshPage}
        selectedIdToEdit={selectedIdToEdit}
      />
      <BlockModal show={showBlockModal} setShow={setShowBlockModal} />
      <div className="d-flex justify-content-between">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="search..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="mb-2  form-control shadow-none search-input pe-4"
          />
          <MdSearch className="search-icon" />
        </div>
        <div
          className="fw-bold btn-medium"
          onClick={() => setShowAddProjectModal(true)}
        >
          Add Project +
        </div>
      </div>
      <div className="table-container">
        <table className="table-local">
          <tbody>
            <tr>
              <th>Project Name</th>
              <th>Client Name</th>
              <th>Project Manager</th>
              <th>Technology</th>
              <th>status</th>
              <th>Start Date</th>
              <th>Actions</th>
            </tr>

            {data?.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item?.project_name}</td>
                  <td>{item?.client?.client_name}</td>
                  <td>{item?.project_manager?.name || "Not Selected"}</td>
                  <td>{item?.technology?.map((item) => `${item.name}`)}</td>
                  <td>{item?.status}</td>
                  <td>{dashDate(item?.project_start_date)}</td>
                  <td>
                    <BsFillEyeFill
                      className="me-1 cursor-pointer"
                      onClick={() =>
                        navigate(`/admin/view-project/${item._id}`)
                      }
                    />{" "}
                    <MdEdit
                      className="me-1 cursor-pointer"
                      onClick={() => {
                        setSelectedIdToEdit(item._id);
                        setShowEditProjectModal(true);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination total={totalPage} page={page} />
    </Wrapper>
  );
}

export default Projects;
const Wrapper = Styled.div`
/* width:100%;
display:flex;
justify-content:center; */
/* .table-container{
  width:100%;
  justify-content:center;
  display:flex;
  align-items:center;
} */
 
`;
