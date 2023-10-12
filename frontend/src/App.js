import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './css/App.css';

import Navbar from './components/navbar.component';
import Dashboard from './components/dashboard.component';
import Course from './components/course.component';
import Login from './components/login.component';
import Assignment from './components/assignment.component';
import Register from './components/register.component';
import ProfilePage from './components/profilePage.component';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path = '/' element={<Dashboard/>} />
        <Route path = '/course/:id' element={<Course/>} />
        <Route path = '/signin' element={<Login/>} />
        <Route path = '/register' element={<Register/>} />
        <Route path = '/dashboard/:id' element={<Dashboard/>} />
        <Route path = '/assignment/:id' element={<Assignment/>} />
        <Route path = '/profilepage' element={<ProfilePage/>} />
      </Routes>
    </Router>
  );
}
