import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {DATA_SERVER_URL} from '../../constants';
import http from '../../http';
import '../../css/assignment.css';

export default function StudentAssignment() {
    const {assignment_id} = useParams();
    const [assignment, setAssignment] = useState();
    const [file, setFile] = useState(null);

    useEffect(() => {
        async function getAssignment() {
            let response = await http.get(DATA_SERVER_URL + '/assignments/' + assignment_id);
            setAssignment(response.data.assignment);
        }
        getAssignment();
    }, []);

    const handleUpload = async () => {
        try {
            if (!file) {
                console.error('Please select a file');
                return;
            }

            // ensure the selected file is a PDF
            if (file.type !== 'application/pdf') {
                console.error('Please select a PDF file');
                return;
            }

            // get student id
            let response = await http.get(DATA_SERVER_URL + "/students/" + "_id");
            let student_id = response.data._id;

            // attach file to formData that will be send to backend
            const formData = new FormData();
            formData.append('file', file);

            // additional data (besides the submission file)
            let payload = {
                student_id: student_id,
                grade: -1,
                comment: ""
            };
            Object.entries(payload).forEach(([key, value]) => {
                formData.append(key, value);
            });

            // send submission to server
            response = await http.post(DATA_SERVER_URL + "/submissions/", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            let submission_id = response.data._id;

            // attach the new submission to the assignment
            response = await http.get(DATA_SERVER_URL + '/assignments/' + assignment_id);
            let updated_assignment = response.data.assignment;
            updated_assignment.submissions.push(submission_id);
            await http.patch(DATA_SERVER_URL + "/assignments/", {assignment: updated_assignment});

            setAssignment(updated_assignment);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    return (
        <div>
            <h2>{assignment && assignment.name}</h2>
            <p>{assignment && assignment.dueDate}</p>
            <p>{assignment && assignment.content}</p>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <button className="small-btn" onClick={handleUpload}>Submit</button>
        </div>
    );
}
