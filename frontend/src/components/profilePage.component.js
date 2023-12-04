import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../css/profilePage.css';
import http from '../http';
import { DATA_SERVER_URL } from "../constants";

export default function ProfilePage() {

    const [student, setStudent] = useState(null);

    useEffect(()=> {  
        async function getStudent() {
            try {
                // ask data server to give me my student id
                let response = await http.get(DATA_SERVER_URL + "/students/" + "_id");
                console.log('API Response:', response);
                let student_id = response.data._id;

                // use the student id to fetch my student object
                response = await http.get(DATA_SERVER_URL + "/students/" + student_id);
                setStudent(response.data.student);
            } catch(error) {
                console.log("Error fetching student", error);
            }
        }
        getStudent();
    }, []);

    return(
        <div>
            <h3>User Profile</h3>
            <p>First Name: {student && student.firstName}</p>
            <p>Last Name: {student && student.lastName}</p>
        </div>
    );
}
