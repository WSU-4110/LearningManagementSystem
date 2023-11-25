import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './bootstrap.css';
import Dashboard from './components/dashboard.component';
import Course from './components/course.component';
import Login from './components/login.component';
import Assignment from './components/assignment.component';
import Register from './components/register.component';
import ProfilePage from './components/profilePage.component';
import Footer from './components/Footer/Footer.component';
import Header from './components/Header/Header.component';
import Settings from './components/settings.component';
import LandingPage from './screens/LandingPage.component';

export default function App() {
    return (
       <Router>
            <Header />
            <Routes>
                <Route path = '/' element={<LandingPage/>} />
                <Route path = '/course/:id' element={<Course/>} />
                <Route path = '/login' element={<Login/>} />
                <Route path = '/register' element={<Register/>} />
                <Route path = '/dashboard/' element={<Dashboard/>} />
                <Route path = '/assignment/:id' element={<Assignment/>} />
                <Route path = '/profilepage' element={<ProfilePage/>} />
                <Route path = '/settings' element={<Settings/>} />
            </Routes>
            <Footer />
        </Router>
    );
}
