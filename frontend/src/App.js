import './css/App.css';


import Navbar from './components/navbar.component';
import Dashboard from './components/dashboard.component';
import Course from './components/course.component';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './components/signin.component';
import ProfilePage from './components/profilePage.component';

function App() 
{
  return (
    

    <Router>
      <Navbar />
      <Routes>
        <Route path = '/' element={<Dashboard/>} />
        <Route path = '/course' element={<Course/>} />
        <Route path = '/signin' element={<Signin/>} />
        <Route path = '/profilepage' element={<ProfilePage/>} />
      </Routes>
    </Router>
  );
}

export default App;
