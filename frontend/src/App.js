import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Navbar from './components/navbar.component';
import Dashboard from './components/dashboard.component';
import Course from './components/course.component';
import Signin from './components/signin.component';
import Assignment from './components/assignment.component';
import Register from './components/register.component';
import './App.css';
export default function App() {
    return (
        <Router>
            <Routes>
                <Route path = '/' element={<Dashboard/>} />
                <Route path = '/course' element={<Course/>} />
                <Route path = '/signin' element={<Signin/>} />
                <Route path = '/register' element={<Register/>} />
                <Route path = '/dashboard' element={<Dashboard/>} />
                <Route path = '/assignment' element={<Assignment/>} />
            </Routes>
        </Router>
    );
};
