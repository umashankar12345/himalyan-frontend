import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import Pagination from "../../../components/Pagination";
import { BsFillEyeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { MdEdit, MdBlock, MdSearch } from "react-icons/md";
import AddResourceModal from "../../../components/modals/resources/AddResourceModal";
import EditResourceModal from "../../../components/modals/resources/EditResourceModal";
import Loader from "../../../components/LoaderWave";
import Axios from "../../../utils/api";
import BlockModal from "../../../components/modals/BlockModal";
import Filter from "../../../components/Filter";
function Resources() {
  const [showAddResourceModal, setShowAddResourceModal] = useState(false);
  const [showEditResourceModal, setShowEditResourceModal] = useState(false);
  const [teamLeadFilter, setTeamLeadFilter] = useState("");
  const [jobTitleFilter, setJobTitleFilter] = useState("");
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState("");
  const [refreshPage, setRefreshPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const jobFilterMenuItems = [
    {
      name: "salesforce developer",
      action: applyJobTitleFilter,
    },
    {
      name: "salesforce developer trainee",
      action: applyJobTitleFilter,
    },
    {
      name: "salesforce admin",
      action: applyJobTitleFilter,
    },
    {
      name: "salesforce admin trainee",
      action: applyJobTitleFilter,
    },
    { name: "quality analyst", action: applyJobTitleFilter },
    {
      name: "quality analyst trainee",
      action: applyJobTitleFilter,
    },
    { name: "web developer", action: applyJobTitleFilter },
    {
      name: "web developer trainee",
      action: applyJobTitleFilter,
    },
    {
      name: "buisness analyst",
      action: applyJobTitleFilter,
    },
    {
      name: "buisness analyst trainee",
      action: applyJobTitleFilter,
    },
  ];

  const teamLeadMenuItems = [
    { name: "rupali dixit", action: applyTeamLeadFilter },
    { name: "tushar gupta", action: applyTeamLeadFilter },
    { name: "amit kumar", action: applyTeamLeadFilter },
    { name: "gaurav rawat", action: applyTeamLeadFilter },
    { name: "shreya pandey", action: applyTeamLeadFilter },
    { name: "vikash negi", action: applyTeamLeadFilter },
    { name: "akash kandwal", action: applyTeamLeadFilter },
    { name: "sadiq rizvi", action: applyTeamLeadFilter },
    { name: "phool chandra", action: applyTeamLeadFilter },
    { name: "ashok kumar", action: applyTeamLeadFilter },
  ];

  function applyJobTitleFilter(value) {
    setTeamLeadFilter("");
    setJobTitleFilter(value);
    setPage(1);
  }
  function applyTeamLeadFilter(value) {
    setJobTitleFilter("");
    setTeamLeadFilter(value);
    setPage(1);
  }
  const getData = async () => {
    try {
      setLoading(true);
      const response = await Axios.get(
        `/admin/resources?page=${page}&keyword=${search}&team_lead=${teamLeadFilter}&job_title=${jobTitleFilter}`
      );
      console.log(response);
      console.log(response.data.data);
      setData(response.data.data);
      setTotalPage(response.data.total_pages);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const changeResourceStatus = async () => {
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
  }, [search, page, refreshPage, teamLeadFilter, jobTitleFilter]);

  return (
    <Wrapper>
      {loading && <Loader />}
      {
        <BlockModal
          message1={"Are you sure you want to block this resource?"}
          message2={"Are you sure you want to unblock this resource?"}
          status={selectedResource?.status}
          changeResourceStatus={changeResourceStatus}
          show={showBlockModal}
          setShow={setShowBlockModal}
        />
      }
      <AddResourceModal
        show={showAddResourceModal}
        setShow={setShowAddResourceModal}
        refreshPage={refreshPage}
        setRefreshPage={setRefreshPage}
      />
      <EditResourceModal
        show={showEditResourceModal}
        setShow={setShowEditResourceModal}
        refreshPage={refreshPage}
        setRefreshPage={setRefreshPage}
      />
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
        <div>
          <div
            className="fw-bold btn-medium "
            onClick={() => setShowAddResourceModal(true)}
          >
            Add Resources +
          </div>
        </div>
      </div>

      <div className="d-flex mt-3">
        <div className="me-4">
          <Filter
            filterMenuItems={jobFilterMenuItems}
            filterName={"filter By Job Title"}
          />
        </div>

        <Filter
          filterMenuItems={teamLeadMenuItems}
          filterName={"filter By Team Lead"}
        />
        <div
          className="grey-button ms-3"
          onClick={() => {
            setJobTitleFilter("");
            setTeamLeadFilter("");
          }}
        >
          clear All Filters
        </div>
      </div>

      <div className="table-container">
        <table className="table-local">
          <tbody>
            <tr>
              <th>S.No</th>
              <th>Emp Id</th>
              <th>Emp Name</th>
              <th>Email</th>
              <th>Job Title</th>
              <th>Active</th>
              <th>Role</th>
              <th>Branch</th>
              <th>Reporting To</th>
              <th>Actions</th>
            </tr>

            {data?.map((item, i) => {
              return (
                <tr key={item._id}>
                  <td>{(page - 1) * 10 + i + 1}</td>
                  <td>{item.emp_id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td> {item?.job_title}</td>
                  <td>{item.active ? "Yes" : "No"}</td>
                  <td>{item.role}</td>
                  <td>{item.location}</td>
                  <td>{item?.reporting_to}</td>
                  <td>
                    <BsFillEyeFill
                      className="me-1 cursor-pointer"
                      onClick={() =>
                        navigate(`/admin/view-resource/${item._id}`)
                      }
                    />
                    <MdEdit
                      className="me-1 cursor-pointer"
                      onClick={() => setShowEditResourceModal(true)}
                    />
                    <MdBlock
                      className="me-1 cursor-pointer"
                      onClick={() => {
                        setShowBlockModal(true);
                        setSelectedResource({
                          _id: item._id,
                          status: item.active,
                        });
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination page={page} setPage={setPage} total={totalPage} />
      </div>
    </Wrapper>
  );
}

export default Resources;
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
