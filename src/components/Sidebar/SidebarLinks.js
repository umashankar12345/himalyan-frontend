import { MdDashboard } from "react-icons/md";
import {GrMultiple} from "react-icons/gr"
import {FaUsers,FaUserSecret,FaChalkboardTeacher,FaFistRaised,FaTeamspeak} from "react-icons/fa"
import {BsLaptopFill,BsStack,BsFileEarmarkSpreadsheetFill} from "react-icons/bs"
import {MdFilterListAlt,MdDns,MdOutlineSchedule,MdSettings,MdOutlineQueryStats} from "react-icons/md"


export const adminLinks = [
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    Icon:BsStack
  },
  {
    path: "/admin/projects",
    name: "Projects",
    Icon:BsStack
  },

  {
    path: "/admin/resources",
    name: "Resources",
    Icon:FaUsers
  },

  {
    path: "/admin/statusupdates",
    name: "Status Updates",
    Icon:MdFilterListAlt

  },
  {
    path: "/admin/statusfilters",
    name: "Status Filter",
    Icon:MdFilterListAlt
  },
  {
    path: "/admin/clients",
    name: "Client List",
    Icon:FaUserSecret
  },
  {
    path: "/admin/expertise",
    name: "Expertise",
    Icon:BsLaptopFill
  },
  // {
  //   path: "/ongoingprojects",
  //   name: "Ongoing Projects",
  //   icon: "nc/icon nc/bullet/list/67",
  //   component: OngoingProjects,
  //   layout: "/admin",
  // },
  {
    path: "/admin/mastersheets",
    name: "Master Sheets",
    Icon:FaChalkboardTeacher
  },
  {
    path: "/admin/timesheets",
    name: "Time Sheets",
    Icon:BsFileEarmarkSpreadsheetFill
  },
  // {
  //   path: "/deliviredprojects",
  //   name: "Delivired Projects",
  //   icon: "nc/icon nc/bullet/list/67",
  //   component: DeliviredProjects,
  //   layout: "/admin",
  // },
    {
    path: "admin/query",
    name: "Query",
    Icon:MdOutlineQueryStats
  },
  {
    path: "admin/manage",
    name: "Manage",
    Icon:MdSettings
  },
  {
    path: "admin/summersheets",
    name: "Summer Sheets",
    Icon:FaChalkboardTeacher
  },
];

export const superAdminLinks = [
    {
      path: "/superadmin/dashboard",
      name: "Dashboard",
      Icon: MdDashboard,
    },
   
    {
      path: "/superadmin/projects",
      name: "Projects",
      Icon: BsStack,
      
    },
  
    {
      path: "/superadmin/resources",
      name: "Resources",
      Icon: FaUsers,
      
    },
  
    {
      path: "/superadmin/statusupdates",
      name: "Status",
      Icon: MdDns,
      
    },
    {
      path: "/superadmin/statusfilter",
      name: "Status Filter",
      Icon: MdFilterListAlt,
      
    },
    {
      path: "/superadmin/clients",
      name: "Client List",
      Icon: FaUserSecret,
      
    },
    {
      path: "/superadmin/expertise",
      name: "Expertise",
      Icon: BsLaptopFill,
      
    },
    // {
    //   path: "/ongoingprojects",
    //   name: "Ongoing Projects",
    //   icon: "nc/icon nc/bullet/list/67",
    //   component: OngoingProjects,
    //   layout: "/admin",
    // },
    {
      path: "/superadmin/mastersheets",
      name: "Master Sheets",
      Icon: FaChalkboardTeacher,
      
    },
    // {
    //   path: "/deliviredprojects",
    //   name: "Delivired Projects",
    //   icon: "nc/icon nc/bullet/list/67",
    //   component: DeliviredProjects,
    //   layout: "/admin",
    // },
  
  ];

  export const reviewerLinks=[
    {
      path: "/reviewer/review",
      name: "Review Invites",
      Icon: BsStack,
    },
   
  ]

  export const authorLinks= [
    {
      path: "/author/SubmitManuscript",
      name: "New Manuscript",
      Icon: BsStack,
    },
    // {
    //   path: "/profile",
    //   name: "Profile",
    //   icon: "nc/icon nc/single/02",
    //   component: UpdateUserProfile,
    //   layout: "/admin",
    // },
    {
      path: "/author/revisions",
      name: "Feedbacks",
      Icon: MdDns,
    },
    // {
    //   path: "/author/completed",
    //   name: "Completed",
    //   Icon: MdDns,
      
    // },
    
   
  ];

  export const pcPmLinks = [
    {
      path: "/pcpm/projects",
      name: "Projects",
      Icon: BsStack,
    },
    {
      path: "/pcpm/riserequest",
      name: "Request",
      Icon:FaFistRaised
    },
   
   
  ];

  export const teamLeadLinks = [
    {
      path: "/tl/projects",
      name: "Projects List",
      Icon: BsStack,
    },
    {
      path: "/tl/status",
      name: "Status",
      Icon: MdDns,
    },
    {
      path: "/tl/expertise",
      name: "Expertise",
      Icon: BsLaptopFill,
    
    },
    {
      path: "/tl/resources",
      name: "Team Members",
      Icon: FaUsers,
    
    },
    {
      path: "/tl/teamstatusupdates",
      name: "Team Status",
      Icon:FaTeamspeak
    
    },
  ];