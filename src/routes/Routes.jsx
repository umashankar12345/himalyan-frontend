import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/common/Login";
import Register from "../pages/common/Register";
import Home from "../pages/common/Home";
import Carousel from "../pages/common/Carousel";
import Home2 from "../pages/common/Home2";
import SubmitManuscript from "../pages/author/SubmitManuscript";
import Revisions from "../pages/author/Revisions";
import RevisionView from "../pages/author/RevisionView";
import Completed from "../pages/author/Completed";
import ReviewDetails from "../pages/Reviewer/Review";
import ReviewInvites from "../pages/Reviewer/ReviewInvites";

import Reviewed from "../pages/Reviewer/Reviewed";

//adminimports
const AdminDashboard = lazy(() => import("../pages/admin/dashboard/Dashboard"));
const AdminClients = lazy(() => import("../pages/admin/clients/Clients"));

const AdminExpertise = lazy(() => import("../pages/admin/expertise/Expertise"));
const AdminManage = lazy(() => import("../pages/admin/manage/Manage"));
const AdminMastersheets = lazy(() =>
  import("../pages/admin/masterSheets/MasterSheets")
);
const AdminProjects = lazy(() => import("../pages/admin/projects/Projects"));
const AdminViewProject = lazy(() =>
  import("../pages/admin/projects/viewProject/ViewProject")
);
const AdminViewResource = lazy(() =>
  import("../pages/admin/resources/viewResource/ViewResource")
);
const AdminQuery = lazy(() => import("../pages/admin/query/Query"));
const AdminResources = lazy(() => import("../pages/admin/resources/Resources"));
const AdminStatusFilters = lazy(() =>
  import("../pages/admin/statusFilters/StatusFilters")
);
const AdminStatusUpdates = lazy(() =>
  import("../pages/admin/statusUpdates/StatusUpdates")
);
const AdminSummerSheets = lazy(() =>
  import("../pages/admin/summerSheets/SummerSheets")
);
const AdminTimesheets = lazy(() =>
  import("../pages/admin/timesheets/Timesheets")
);

//superadmin imports
const SuperAdminDashboard = lazy(() =>
  import("../pages/superAdmin/dashboard/Dashboard")
);
const SuperAdminClients = lazy(() =>
  import("../pages/superAdmin/clients/Clients")
);

const SuperAdminExpertise = lazy(() =>
  import("../pages/superAdmin/expertise/Expertise")
);
const SuperAdminManage = lazy(() =>
  import("../pages/superAdmin/manage/Manage")
);
const SuperAdminMastersheets = lazy(() =>
  import("../pages/superAdmin/masterSheets/MasterSheets")
);
const SuperAdminProjects = lazy(() =>
  import("../pages/superAdmin/projects/Projects")
);
const SuperAdminQuery = lazy(() => import("../pages/superAdmin/query/Query"));
const SuperAdminResources = lazy(() =>
  import("../pages/superAdmin/resources/Resources")
);
const SuperAdminStatusFilters = lazy(() =>
  import("../pages/superAdmin/statusFilters/StatusFilters")
);
const SuperAdminStatusUpdates = lazy(() =>
  import("../pages/superAdmin/statusUpdates/StatusUpdates")
);
const SuperAdminSummerSheets = lazy(() =>
  import("../pages/superAdmin/summerSheets/SummerSheets")
);
const SuperAdminTimesheets = lazy(() =>
  import("../pages/superAdmin/timesheets/Timesheets")
);

//user imports
const UserTimesheets = lazy(() =>
  import("../pages/user/timesheets/Timesheets")
);
const UserExpertise = lazy(() => import("../pages/user/expertise/Expertise"));
const UserNonBillable = lazy(() =>
  import("../pages/user/nonBillable/NonBillable")
);
const UserProjects = lazy(() => import("../pages/user/projects/Projects"));
const UserStatus = lazy(() => import("../pages/user/status/Status"));
const UserTimeSchedular = lazy(() =>
  import("../pages/user/timeSchedular/TimeSchedular")
);

//team lead imports

const TeamLeadExpertise = lazy(() =>
  import("../pages/teamLead/expertise/Expertise")
);
const TeamLeadResources = lazy(() =>
  import("../pages/teamLead/resources/Resources")
);
const TeamLeadProjects = lazy(() =>
  import("../pages/teamLead/projects/Projects")
);
const TeamLeadStatus = lazy(() => import("../pages/teamLead/status/Status"));
const TeamStatusUpdates = lazy(() =>
  import("../pages/teamLead/teamStatusUpdates/TeamStatusUpdates")
);

//pcpm imports

const PcPmProjects = lazy(() => import("../pages/pcpm/projects/Projects"));
const PcPmRaiseRequest = lazy(() =>
  import("../pages/pcpm/raiseRequest/RaiseRequest")
);

function routes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Carousel />} />
            <Route path="login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route
            element={
              <PrivateRoute>
                <Home2 />
              </PrivateRoute>
            }
          >
            <Route path="/reviewer">
              <Route
                index
                element={
                  <PrivateRoute>
                    <ReviewInvites />
                  </PrivateRoute>
                }
              />
              <Route
                path="review"
                element={
                  <PrivateRoute>
                    <ReviewInvites />
                  </PrivateRoute>
                }
              />
              <Route path="reviewDetails/:id" element={<ReviewDetails />} />
            </Route>
            <Route path="/author">
              <Route index element={<SubmitManuscript />} />
              <Route path="submitManuscript" element={<SubmitManuscript />} />
              <Route path="revisions" element={<Revisions />} />
              <Route path="revision/:id" element={<RevisionView />} />
              <Route path="completed" element={<Completed />} />
            </Route>

            <Route path="/pcpm">
              <Route path="projects" element={<PcPmProjects />} />
              <Route path="raiserequest" element={<PcPmRaiseRequest />} />
            </Route>
            <Route path="/superadmin">
              <Route path="dashboard" element={<SuperAdminDashboard />} />
              <Route path="clients" element={<SuperAdminClients />} />
              <Route path="projects" element={<SuperAdminProjects />} />
              <Route path="resources" element={<SuperAdminResources />} />
              <Route path="timesheets" element={<SuperAdminTimesheets />} />
              <Route path="expertise" element={<SuperAdminExpertise />} />
              <Route path="manage" element={<SuperAdminManage />} />
              <Route path="query" element={<SuperAdminQuery />} />
              <Route
                path="statusfilters"
                element={<SuperAdminStatusFilters />}
              />
              <Route
                path="statusupdates"
                element={<SuperAdminStatusUpdates />}
              />
              <Route path="summersheets" element={<SuperAdminSummerSheets />} />
              <Route path="mastersheets" element={<SuperAdminMastersheets />} />
            </Route>
            <Route path="/admin">
              <Route index element={<AdminProjects />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="view-project/:id" element={<AdminViewProject />} />
              <Route path="resources" element={<AdminResources />} />
              <Route path="view-resource/:id" element={<AdminViewResource />} />
              <Route path="clients" element={<AdminClients />} />
              <Route path="timesheets" element={<AdminTimesheets />} />
              <Route path="expertise" element={<AdminExpertise />} />
              <Route path="manage" element={<AdminManage />} />
              <Route path="query" element={<AdminQuery />} />
              <Route path="statusfilters" element={<AdminStatusFilters />} />
              <Route path="statusupdates" element={<AdminStatusUpdates />} />
              <Route path="summersheets" element={<AdminSummerSheets />} />
              <Route path="mastersheets" element={<AdminMastersheets />} />
            </Route>
            <Route path="/pcpm">
              <Route path="projects" element={<PcPmProjects />} />
              <Route path="raiserequest" element={<PcPmRaiseRequest />} />
            </Route>
            <Route path="/tl">
              <Route path="projects" element={<TeamLeadProjects />} />
              <Route path="resources" element={<TeamLeadResources />} />
              <Route path="expertise" element={<TeamLeadExpertise />} />
              <Route path="status" element={<TeamLeadStatus />} />
              <Route path="statusupdates" element={<TeamStatusUpdates />} />
            </Route>
            <Route path="/user">
              <Route path="projects" element={<UserProjects />} />
              <Route path="status" element={<UserStatus />} />
              <Route path="nonbillable" element={<UserNonBillable />} />
              <Route path="expertise" element={<UserExpertise />} />
              <Route path="timesheets" element={<UserTimesheets />} />
              <Route path="timeschedular" element={<UserTimeSchedular />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default routes;
