import React from "react";
import Styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdMenu } from "react-icons/md";
import { useSelector } from "react-redux";
function Header({ hideSidebar, setHideSidebar }) {
  const { headerTitle } = useSelector((state) => state.appInfo);

  return (
    <Wrapper>
      <header className={hideSidebar ? "header-full" : "header-half"}>
        <div
          className="d-flex justify-content-between align-items-center "
          style={{ height: "100%", color: "#000" }}
        >
          <div className="d-flex align-items-center">
            <MdMenu
              className="cursor-pointer ms-4 me-3"
              onClick={() => setHideSidebar(!hideSidebar)}
            />
            <h2 className=" h3">{headerTitle}</h2>
          </div>

          <div className="image-container">
            <img
              src={require("../assets/images/user-img.jpg")}
              alt="profile pic"
              className="profile-pic"
            />
          </div>
        </div>
      </header>
    </Wrapper>
  );
}

export default Header;

const Wrapper = Styled.div`

.image-container{
  height:100%;
  display:flex;
  justify-content:flex-end;
  align-items:center;
  margin-right:10px;
}

.profile-pic{
  width:50px;
  height:50px;
  border-radius:50%;
}

.header-half{
  position:fixed;
  
  // left:250px;
   left:250px;
   top:0;
   right: 0;
  width: calc(100% - 250px);
  background-color:#F9F9F9;
  
  // height:70px;
  height:70px;
  
  -webkit-box-shadow: 0px 4px 5px -1px rgba(153,151,153,1);
-moz-box-shadow: 0px 4px 5px -1px rgba(153,151,153,1);
box-shadow: 0px 4px 5px -1px rgba(153,151,153,1);
z-index:10;
}

.header-full{
  position:fixed;
  
  // left:250px;
   left:0px;
   top:0;
   right: 0;
  
  background-color: #F9F9F9;
  // height:70px;
  height:70px;
  -webkit-box-shadow: 0px 4px 5px -1px rgba(153,151,153,1);
-moz-box-shadow: 0px 4px 5px -1px rgba(153,151,153,1);
box-shadow: 0px 4px 5px -1px rgba(153,151,153,1);
z-index:10;
}


`;
