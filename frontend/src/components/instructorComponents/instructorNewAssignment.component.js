import {useNavigate, useParams} from 'react-router-dom';
import {useState} from 'react';
import {AUTH_SERVER_URL, DATA_SERVER_URL} from '../../constants';   
import http from '../../http';

export default function InstructorNewAssignment() {
    const [name, setName] = useState('');
    const [due_date, setDueDate] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const { course_id } = useParams(); //course id
    
    async function handleCreate() {
        const assignment = {
            name: name,
            dueDate: '1944-06-06T06:30:00.000Z', //FIX
            content: content
        }
        let response = await http.post(DATA_SERVER_URL + '/assignments', {assignment});
        let assignmnet_id = response.data._id;
        response = await http.get(DATA_SERVER_URL + '/courses/' + course_id);
        let course = response.data.course;
        course.assignments.push(assignmnet_id);
        await http.patch(DATA_SERVER_URL + '/courses', {course});
    }
    
    return (
        <div className="container">
            <h1>New Assignment</h1>
            <form>
                <input
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="due date"
                    value={due_date}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button type="button" onClick={handleCreate}>
                    Create
                </button>            
            </form>
        </div>
    );
    }