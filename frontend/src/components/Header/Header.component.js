import React from 'react'
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
// return (
//     <>
//     {[false, 'sm', 'md', 'lg', 'xl', 'xxl'].map((expand) => (
//         <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
//         <Container fluid>
//             <Navbar.Brand as={Link} to="/dashboard">LMS</Navbar.Brand>
//             <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
//             <Navbar.Offcanvas
//             id={`offcanvasNavbar-expand-${expand}`}
//             aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
//             placement="end"
//             >
//             <Offcanvas.Header closeButton>
//                 <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
//                 LMS
//                 </Offcanvas.Title>
//             </Offcanvas.Header>
//             <Offcanvas.Body>
//                 <Nav className="justify-content-end flex-grow-1 pe-3">
//                 <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
//                 <NavDropdown
//                     title="User"
//                     id={`offcanvasNavbarDropdown-expand-${expand}`}>
//                     <NavDropdown.Item as={Link} to="/profilePage">Profile</NavDropdown.Item>
//                     <NavDropdown.Divider />
//                     <NavDropdown.Item
//                         onClick={handleLogout}
//                     >
//                     Log out
//                     </NavDropdown.Item>
//                 </NavDropdown>
//                 </Nav>
//                 <Form className="d-flex">
//                 <Form.Control
//                     type="search"
//                     placeholder="Search"
//                     className="me-2"
//                     aria-label="Search"
//                 />
//                 <Button variant="outline-success">Search</Button>
//                 </Form>
//             </Offcanvas.Body>
//             </Navbar.Offcanvas>
//         </Container>
//         </Navbar>
//     ))}
//     </>
// );

// return (
//     <Navbar expand="lg" className="bg-body-tertiary">
//     <Container>
//         <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//         <Nav className="me-auto">
//             <Nav.Link href="#home">Home</Nav.Link>
//             <Nav.Link href="#link">Link</Nav.Link>
//             <NavDropdown title="Dropdown" id="basic-nav-dropdown">
//             <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//             <NavDropdown.Item href="#action/3.2">
//                 Another action
//             </NavDropdown.Item>
//             <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//             <NavDropdown.Divider />
//             <NavDropdown.Item href="#action/3.4">
//                 Separated link
//             </NavDropdown.Item>
//             </NavDropdown>
//         </Nav>
//         </Navbar.Collapse>
//     </Container>
//     </Navbar>
// );
}

export default Header
