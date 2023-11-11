import React from 'react'
import '../../css/header.css';
import http from '../../http';

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

async function handleLogout() {
  await http.post('http://localhost:4000/logout', {token: localStorage.getItem('refreshToken')});
}

function Header() {
  return (
      <>
        <Navbar expand="lg" className="bg-body-tertiary nav">
          <Container className="nav-content">
            <Navbar.Brand href="#home">LMS</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                <NavDropdown title="User" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/profilePage">Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {/* 
        <div>
          <Routes>
            <Route path = '/dashboard/' element={<Dashboard/>} />
            <Route path = '/profilepage' element={<ProfilePage/>} /> 
          </Routes>
          <Routes>
            <Route exact path = '/dashboard/' element={<Dashboard/>}/>
            <Route exact path = '/profilepage' element={<ProfilePage/>}/> 
          </Routes> 
        </div>
        */}
      </>
  );
}

export default Header
