import React from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from "react-bootstrap/Form";
//import FormControl from "react-bootstrap/FormControl";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import { Link, Route, Routes} from 'react-router-dom';


import Dashboard from '../dashboard.component';
import ProfilePage from '../profilePage.component';
import { LinkContainer } from 'react-router-bootstrap';
import LandingPage from '../../screens/LandingPage.component';

function Header() {
  return (
      <>
        {[false, 'sm', 'md', 'lg', 'xl', 'xxl'].map((expand) => (
          <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
            <Container fluid>
              <Navbar.Brand as={Link} to="/dashboard">LMS</Navbar.Brand>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    LMS
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                    <NavDropdown
                      title="User"
                      id={`offcanvasNavbarDropdown-expand-${expand}`}>
                      <NavDropdown.Item as={Link} to="/profilePage">Profile</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action5">
                        Log Out
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      <div>
        {/* 
        <Routes>
          <Route path = '/dashboard/' element={<Dashboard/>} />
          <Route path = '/profilepage' element={<ProfilePage/>} /> 
        </Routes>
        <Routes>
          <Route exact path = '/dashboard/' element={<Dashboard/>}/>
          <Route exact path = '/profilepage' element={<ProfilePage/>}/> 
        </Routes> 
        */}
      </div>
      </>
  );
}

export default Header
