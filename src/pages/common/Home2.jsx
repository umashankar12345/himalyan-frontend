import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header";
import Styled from "styled-components";

function Home() {
  const [hideSidebar, setHideSidebar] = useState(false);
  return (
    <Wrapper>
      <div className="outlet-container">
        <div>
          <Sidebar hideSidebar={hideSidebar} setHideSidebar={setHideSidebar} />
        </div>

        <div className={hideSidebar ? "outlet-full-width" : "outlet-partial"}>
          <Outlet />
        </div>
      </div>
    </Wrapper>
  );
}

export default Home;
const Wrapper = Styled.div`

    .outlet-container{
       display:flex;
       width:100%;
    }
    .outlet-partial{
      margin-top:100px;
      margin-left:17rem;
      margin-right:1.5rem;
      width:calc(100% - 264px);
      /* overflow:auto; */
      
    }
    .outlet-full-width{
      margin-top:100px;
      margin-left:5px;
      margin-right:20px;
      width:100%;
      /* overflow-x:auto; */
    }
    @media(max-width:500px){
      /* .outlet-partial{
       overflow:auto
      } */
      .outlet-full-width{
        margin-left:8rem;
      }
    }

    .ctr{
      overflow-x:auto;
    }
   
`;
