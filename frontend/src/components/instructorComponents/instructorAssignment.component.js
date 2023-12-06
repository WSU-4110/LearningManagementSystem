import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {DATA_SERVER_URL} from '../../constants';
import http from '../../http';
import '../../css/assignment.css';

export default function InstructorAssignment() {
    const {assignment_id} = useParams();
    const [assignment, setAssignment] = useState();
    useEffect(() => {
        async function getAssignment() {
            let response = await http.get(DATA_SERVER_URL + '/assignments/' + assignment_id);
            setAssignment(response.data.assignment);
        }
        getAssignment();
    }, []);
    async function handleSubmit() {
        console.log('thank you for your submission *shredder sounds*');

        // create new submission
        let submission = {

        }
        http.post(DATA_SERVER_URL, + "/submissions/", {submission: submission});

        // attach the new submission to the assignment
        
    }
    
  return (
    <div className="container">
      <h2>{assignment && assignment.name}</h2>
      <p>{assignment && assignment.dueDate}</p>
      <p>{assignment && assignment.content}</p>
      <form>
        <input type="file" />
        <div>
          <button className="small-btn" type="button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}