import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import "./LandingPage.css"
import { Route, Routes, Router } from 'react-router-dom'
import Login from '../components/login.component'
import Register from '../components/register.component'
import Button from 'react-bootstrap/esm/Button'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">

            <div>
              <h1 className="title">Welcome to your LMS</h1>
              <p className="subtitle">Register if you haven't already, then login to get started.</p>
            </div>

            <div className="buttonContainer">
              <Link to="/login">Login</Link>
              <Button size="lg" className="landingButton" variant="outline-primary">Login</Button>

              <Link to="/register">Register</Link>
            </div>

          </div>
        </Row>

        {/* <Routes>
          <Route path = '/login' element={<Login/>}/> 
          <Route path = '/register/' element={<Register/>} />
      </Routes> */}
      </Container>
    </div>
  )
}

export default LandingPage
