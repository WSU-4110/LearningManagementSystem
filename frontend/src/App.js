import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar.component';
import Dashboard from './components/dashboard.component';
import Course from './components/course.component';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path = '/' element={<Dashboard/>} />
        <Route path = '/course' element={<Course/>} />
      </Routes>
    </Router>
  );
}

export default App;
