import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
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
            <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
          </Nav>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
