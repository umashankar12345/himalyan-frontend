import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useNavigate, Outlet } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Styled from "styled-components";
function Home() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#Home" onClick={() => navigate("/")}>
              Home
            </Nav.Link>
            <Nav.Link href="#About Journal">About Journal</Nav.Link>
            <Nav.Link href="#Editorial Team">Editorial Team</Nav.Link>
            <Nav.Link href="#Journals">Journals</Nav.Link>
            <Nav.Link href="#Other Publications">Other Publications</Nav.Link>
            <Nav.Link href="#Manuscript Submission">
              Manuscript Submission
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav className="ms-auto">
              <Nav.Link
                href="# Login/Register"
                onClick={() => navigate("/login")}
              >
                Login
              </Nav.Link>
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div>
        <Outlet />
      </div>
    </Wrapper>
  );
}

export default Home;
const Wrapper = Styled.div`
  
    .outlet-container{
       display:flex;
       min-width:100%;
    }
    .outlet-partial{
      margin-top:100px;
      margin-left:17rem;
      margin-right:1.5rem;
      width:100%;
      overflow:auto;
      
    }
    .outlet-full-width{
      margin-top:100px;
      margin-left:5px;
      margin-right:20px;
      width:100%;
      overflow:auto;
    }
    /* @media(max-width:600px){
      .outlet-partial{
        margin-left:30rem;
      }
      .outlet-full-width{
        margin-left:8rem;
      }
    } */

    .ctr{
      overflow-x:auto;
    }
   
`;
