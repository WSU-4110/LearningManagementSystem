import logo from './logo.svg';
import './App.css';
<<<<<<< HEAD
import './signin.js';
=======
import Navbar from './components/navbar.component';
import Dashboard from './components/dashboard.component';
import Course from './components/course.component';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
>>>>>>> d727495e7fef15d3a78586a2bffefca6ce97a4a3

function App() 
{
  return (
<<<<<<< HEAD
    
    <signin />

=======
    <Router>
      <Navbar />
      <Routes>
        <Route path = '/' element={<Dashboard/>} />
        <Route path = '/course' element={<Course/>} />
      </Routes>
    </Router>
>>>>>>> d727495e7fef15d3a78586a2bffefca6ce97a4a3
  );
}

export default App;
