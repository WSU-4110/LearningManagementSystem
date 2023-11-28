import React, { Component, useEffect, useState } from "react";
import '../css/profilePage.css';
import { Link } from 'react-router-dom';
import http from '../http';
//let Student = require('..../models/student.model');


export default function ProfilePage() {

    const [user, setUser] = useState({})

    useEffect(()=> {  
        // here we get the data by requesting data from this link
        // to our nodejs server
        const currentStudentId = getCurrentStudentId();

        http.get('http://localhost:5050/students/')
        .then((res)=> setUser(res.data));
    }, []);

    const getCurrentStudentId = () => {
        
        // Get it from the authentication token or another source
        return '123'; // Replace with the actual ID
    };

    // let firstNames = list.map((Student)=>{
    //     return (
    //         <li key={Student.firstName}>{Student.firstName}</li>
    //     )

    // });

    // let lastNames = list.map((Student)=>{
    //     return (
    //         <li key={Student.lastName}>{Student.lastName}</li>
    //     )

    // });

    return(
        <div>
            <h3>User Profile</h3>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
        </div>
    );

    /*constructor(props) {
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
        };
    }

    onChangeFirstName(e) {
        this.setState({
            firstname: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastname: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }*/

    /*onSubmit(e) {
        e.preventDefault(); // prevent usual html form behavior

        const student = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
        };

        console.log(student)
        // this is where data gets submitted to db
        axios.post('http://localhost:3000/profilePage/update/'+this.props.match.params.id, student)
            .then(res => console.log(res.data));

        window.location = "/" // take user back to homepage
    }*/
}
