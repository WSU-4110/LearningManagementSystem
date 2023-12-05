import React from 'react'
import "./LandingPage.css"
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button'
import { Link } from 'react-router-dom';
import logoImage from '../css/logoTransp.png'
// import Container from 'react-bootstrap/esm/Container'
// import Row from 'react-bootstrap/esm/Row'


const LandingPage = () => {
	const navigate = useNavigate();
	return (
		<div className="container">
			<div className="intro-text">
				<div className='landing-logo'>
                    <Link to="/">
                        <img src={logoImage} alt="Logo" className="logo-image" />
                    </Link>
                </div>
				<div className="buttonContainer">
					<Button size="xl" onClick={() => {navigate("/studentLogin")}} className="landingButton" variant="outline-primary">I am a Student</Button>
					<Button size="xl" onClick={() => {navigate('/instructorLogin')}} className="landingButton" variant="outline-primary">I am an Instructor</Button>
				</div>
			</div>
		</div>
	)
}

export default LandingPage
