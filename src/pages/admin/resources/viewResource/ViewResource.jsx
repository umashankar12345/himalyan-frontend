import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "../../../../utils/api";
import { dashDate } from "../../../../utils/date";
import { IoArrowBack } from "react-icons/io5";
function ViewResource() {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await Axios.get(`/admin/resource?_id=${id}`);
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
    <div className="page-container p-4">
      <div className="back-button">
        <IoArrowBack onClick={() => navigate(-1)} />
      </div>
      <h2 className="text-center fw-bold mb-3"> Resource Details</h2>
      <div className="d-flex justify-content-center">
        <div className="">
          <div className="page-detail-card">
            <div>Name:</div>
            <div>{data?.name}</div>
          </div>
          <div className="page-detail-card">
            <div>Email:</div>
            <div>{data?.email}</div>
          </div>
          <div className="page-detail-card">
            <div>Branch:</div>
            <div>{data?.location}</div>
          </div>
          <div className="page-detail-card">
            <div>Status:</div>
            <div>{data?.status ? "Active" : "Not Active"}</div>
          </div>
          <div className="page-detail-card">
            <div>EmpId:</div>
            <div>{data?.emp_id}</div>
          </div>
          <div className="page-detail-card">
            <div>JobTitle:</div>
            <div>{data?.job_title}</div>
          </div>
          <div className="page-detail-card">
            <div>Role:</div>
            <div>{data?.role}</div>
          </div>
          <div className="page-detail-card">
            <div>Shift:</div>
            <div>{data?.shift}</div>
          </div>
          <div className="page-detail-card">
            <div>Reporting To:</div>
            <div>{data?.reporting_to}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewResource;
