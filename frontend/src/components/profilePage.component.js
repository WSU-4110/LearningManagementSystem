import React, { useEffect, useState } from "react";
import '../css/profilePage.css';
import http from '../http';
import { DATA_SERVER_URL } from "../constants";

export default function ProfilePage() {
    const [student, setStudent] = useState(null);
    const [new_first_name, setNewFirstName] = useState('');
    const [new_last_name, setNewLastName] = useState('');
    const [new_email, setNewEmail] = useState('');
    const [updateMessage, setUpdateMessage] = useState('');

    useEffect(() => {
        async function getStudent() {
            try {
                let response = await http.get(DATA_SERVER_URL + "/students/" + "_id");
                let student_id = response.data._id;
                response = await http.get(DATA_SERVER_URL + "/students/" + student_id);
                setStudent(response.data.student);
                setNewFirstName(response.data.student.firstName);
                setNewLastName(response.data.student.lastName);
                setNewEmail(response.data.student.email);
            } catch (error) {
                console.log("Error fetching student", error);
            }
        }
        getStudent();
    }, []);

    async function updateStudent() {
        try {
            let response = await http.get(DATA_SERVER_URL + "/students/" + student._id);
            let student_obj = response.data.student;

            student_obj.firstName = new_first_name;
            student_obj.lastName = new_last_name;
            student_obj.email = new_email;
            console.log(student_obj);

            await http.patch(DATA_SERVER_URL + "/students/", {student: student_obj });
            setUpdateMessage('Profile updated successfully'); // Set the success message
            setTimeout(() => setUpdateMessage(''), 3000);
            //window.location.reload();
        } catch (error) {
            console.error("Error updating student", error);
        }
    }

    return (
        <div className="container">
            <h3>User Profile</h3>
            <label>
                First Name:
                <input
                    className="inputField"
                    type="inputField"
                    name="firstName"
                    value={new_first_name}
                    onChange={(e) => setNewFirstName(e.target.value)}
                />
            </label>
            <label>
                Last Name:
                <input
                    className="inputField"
                    type="inputField"
                    name="lastName"
                    value={new_last_name}
                    onChange={(e) => setNewLastName(e.target.value)}
                />
            </label>
            <label>
                Email:
                <input
                    className="inputField"
                    type="inputField"
                    name="email"
                    value={new_email}
                    onChange={(e) => setNewEmail(e.target.value)}
                />
            </label>
            <button className='button' onClick={updateStudent}>Update Profile</button>
            {updateMessage && <p>{updateMessage}</p>}
        </div>
    );
}
