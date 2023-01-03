import React, { useEffect, useState } from "react";
import Styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../Header";
import { useSelector, useDispatch } from "react-redux";
import { updateHeader } from "../../redux/slices/appInfoSlice";
import {
  adminLinks,
  superAdminLinks,
  pcPmLinks,
  teamLeadLinks,
  authorLinks,
  reviewerLinks,
} from "./SidebarLinks";

function Sidebar({ hideSidebar, setHideSidebar }) {
  const { activeSidebar } = useSelector((state) => state.appInfo);
  const [sidebarLinks, setSidebarLinks] = useState(authorLinks);
  const dispatch = useDispatch();
  console.log(sidebarLinks);
  const [activeLink, setActiveLink] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  const pathname = "adasf";

  const selectSidebar = () => {
    if (location.pathname === "/author") {
      navigate("/author/SubmitManuscript");
    }
    if (location.pathname === "/reviewer") {
      navigate("/reviewer/review");
    }

    if (activeSidebar === "admin") {
      setSidebarLinks(adminLinks);
    }
    if (activeSidebar === "superAdmin") {
      setSidebarLinks(superAdminLinks);
    }
    if (activeSidebar === "pcpm") {
      setSidebarLinks(pcPmLinks);
    }
    if (activeSidebar === "teamLead") {
      setSidebarLinks(teamLeadLinks);
    }
    if (activeSidebar === "author") {
      setSidebarLinks(authorLinks);
    }
    if (activeSidebar === "reviewer") {
      setSidebarLinks(reviewerLinks);
    }
  };
  useEffect(() => {
    selectSidebar();

    dispatch(updateHeader("projects"));
  }, [activeSidebar]);

  return (
    <>
      <Header hideSidebar={hideSidebar} setHideSidebar={setHideSidebar} />
      <Navigation>
        <div className={hideSidebar ? "hide-sidebar " : "navigation"}>
          <div>
            <div className="sidebar-logo">
              <img
                src={require("../../assets/images/cloud-icon.png")}
                alt="logo"
                className="logo"
              />
            </div>

            <div className="sidebar-inner-container">
              {sidebarLinks &&
                sidebarLinks.map((item, i) => {
                  return (
                    <div key={i} className="sidebar-inner-item">
                      <Link
                        className={
                          location?.pathname === item.path
                            ? "sidebar-inner-link active"
                            : "sidebar-inner-link"
                        }
                        to={item.path}
                        state={{ headerTitle: item.name }}
                        onClick={() => setHideSidebar(true)}
                      >
                        <item.Icon className="me-1 icons" />
                        {item.name}
                      </Link>
                    </div>
                  );
                })}
              <div className="d-flex justify-content-center">
                <button
                  className="btn-logout"
                  onClick={() => {
                    localStorage.clear();
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </Navigation>
    </>
  );
}
const Navigation = Styled.div`
 .navigation{
  position:fixed;
  /* min-height:100vh; */
  
  top: 0;
  bottom: 0;
  //min-height:100vh;
 width:16.5rem;
 background-color:var(--sidebar-color);

 color:var(--textcolor); 
 text-transform:uppercase;
 font-size:18px;
 display:flex;
 justify-content:center;

 
 -webkit-box-shadow: 4px 3px 15px -4px rgba(0,0,0,0.75);
-moz-box-shadow: 4px 3px 15px -4px rgba(0,0,0,0.75);
box-shadow: 4px 3px 15px -4px rgba(0,0,0,0.75);
z-index:1124;

 }

 .navigation-inner{
  overflow-y:scroll;
  min-height:100%;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
 }
  

/* @media(max-width:600px){
  transform:translate(-100%);
} */
 

 
.hide-sidebar{
  display:none!important;
  /* transform:translateX(-100%); */
  transition:1s ease-out;
}
  .sidebar-logo{

   font-weight:bold;
   font-size:2rem;
   margin-top:2rem;
   width:100%;
   display:flex;
   justify-content:center;
   padding:20px;
  }
 .logo{
    width:50px;
    height:50px;
    border-radius:50%;
 }

.sidebar-container{
    height:100%;
    width:100%;
    flex-grow:0;
}

.sidebar-inner-container{
    width:100%;
    
    
    color:var(--sidebar);
    overflow-y:none;
    height:calc(100% - 120px);
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: 1px;  /* Firefox */
 
}

.sidebar-inner-container::-webkit-scrollbar { 
width:5px;
  
}
.sidebar-inner-container::-webkit-scrollbar-thumb {
  background: #888;
  background: #f1f1f1;

}
.sidebar-inner-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  background: #888;

}


.sidebar-inner-link{
    text-decoration:none;
    /* color:var(--sidebar); */
    color:#f0f7ee;
    cursor:pointer;
    display:block;
    width:100%;
    margin:1rem 0;
    padding:1rem 2rem;
    font-weight:300;
   // background-color:transparent;
    /* transform: skew(-10deg); 
    background: rgba(255, 255, 255, 0.2);
border-radius: 30px; */
/* box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(5px);
-webkit-backdrop-filter: blur(5px);
border: 1px solid rgba(255, 255, 255, 0.3); */
}

/* .sidebar-inner-link::after{
  content:"";
  position:absolute;
  width:20px;
  border-radius: 30px;

  height:100%;
  right:0;
  background: rgba(255, 255, 255, 0.2);
} */

.active{
  /* color:var(--header-color);
  
  background-color:var(--primary-color); */
  color:#000;
  background-color:#fff;
  border-radius:20px;
  -webkit-box-shadow: 0px 7px 8px -2px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 7px 8px -2px rgba(0,0,0,0.75);
box-shadow: 0px 7px 8px -2px rgba(0,0,0,0.75);

}

.sidebar-inner-link:hover{
  
  /* color:var(--header-color);
  
  background-color:var(--primary-color);
  -webkit-box-shadow: 0px 7px 8px -2px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 7px 8px -2px rgba(0,0,0,0.75);
box-shadow: 0px 7px 8px -2px rgba(0,0,0,0.75); */
opacity:0.8;

}

 

.btn-logout{
  padding:10px 25px;
  cursor:pointer;
  background-color:#22A39F;
  border:none;
  border-radius:5px;
  color:white;
  margin-bottom:20px;
  -webkit-box-shadow: 0px 7px 8px -2px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 7px 8px -2px rgba(0,0,0,0.75);
box-shadow: 0px 7px 8px -2px rgba(0,0,0,0.75);
}

.sidebar-inner-link:hover .icons{
    animation:iconsmove infinite 1s ease-in;
    

}

@keyframes iconsmove {
  0%   {transform:rotate(10deg)}
  20%   {transform:rotate(20deg)}
  20%   {transform:rotate(10deg)}
  100% {transform:rotate(0deg)}
}


`;
export default Sidebar;
