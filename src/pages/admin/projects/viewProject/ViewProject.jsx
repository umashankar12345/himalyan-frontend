import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "../../../../utils/api";
import { dashDate } from "../../../../utils/date";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
function ViewProject() {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const getData = async () => {
    try {
      const response = await Axios.get(`/admin/project?_id=${id}`);
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
      <div className="text-center fw-bold mb-3"> Project Details</div>
      <div className="d-flex justify-content-center">
        <div className="">
          <div className="page-detail-card">
            <div>ProjectName:</div>
            <div>{data?.project_name}</div>
          </div>
          <div className="page-detail-card">
            <div>ClientName:</div>
            <div>{data?.client?.client_name}</div>
          </div>
          <div className="page-detail-card">
            <div>Region:</div>
            <div>{data?.region}</div>
          </div>
          <div className="page-detail-card">
            <div>Status:</div>
            <div>{data?.status}</div>
          </div>
          <div className="page-detail-card">
            <div>Type Of Platform:</div>
            <div>{data?.type_of_platform}</div>
          </div>
          <div className="page-detail-card">
            <div>Type Of Project:</div>
            <div>{data?.type_of_project}</div>
          </div>
          <div className="page-detail-card">
            <div>Project Start Date:</div>
            <div>{dashDate(data?.project_start_date)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProject;
