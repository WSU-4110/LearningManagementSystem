import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import "./LandingPage.css"
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button'

const LandingPage = () => {
	const navigate = useNavigate();
	return (
		<div className="main">
			{/* <Container> */}
				{/* <Row> */}
					<div className="intro-text">
						<div>
							<h1 className="title">Welcome to your LMS</h1>
							<p className="subtitle"></p>
						</div>
						<div className="buttonContainer">
							<Button size="xl" onClick={() => {navigate("/studentLogin")}} className="landingButton" variant="outline-primary">I am a Student</Button>
							<Button size="xl" onClick={() => {navigate('/instructorLogin')}} className="landingButton" variant="outline-primary">I am an Instructor</Button>
						</div>
					</div>
				{/* </Row> */}
			{/* </Container> */}
		</div>
	)
}

export default LandingPage
