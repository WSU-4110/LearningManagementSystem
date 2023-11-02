import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './css/App.css';

import Navbar from './components/navbar.component';
import Dashboard from './components/dashboard.component';
import Course from './components/course.component';
import Signin from './components/signin.component';
import Assignment from './components/assignment.component';
import Register from './components/register.component';
import ProfilePage from './components/profilePage.component';
import Settings from './components/settings.component';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      
        <Route path = '/' element={<Dashboard/>} />
        <Route path = '/course/:id' element={<Course/>} />
        <Route path = '/signin' element={<Signin/>} />
        <Route path = '/register' element={<Register/>} />
        <Route path = '/dashboard/:id' element={<Dashboard/>} />
        <Route path = '/assignment/:id' element={<Assignment/>} />
        <Route path = '/profilepage' element={<ProfilePage/>} />
        <Route path = '/settings' element={<Settings/>} />

      </Routes>
    </Router>
  );
}
