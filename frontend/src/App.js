import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import http from './http';
//import './css/App.css';
import './bootstrap.css';
import Navbar from './components/navbar.component';
import Dashboard from './components/dashboard.component';
import Course from './components/course.component';
import Login from './components/login.component';
import Assignment from './components/assignment.component';
import Register from './components/register.component';
import ProfilePage from './components/profilePage.component';
import Footer from './components/Footer/Footer.component';
import Header from './components/Header/Header.component';
import Settings from './components/settings.component';


export default function App() {
    useEffect(() => {
        async function tryRefreshToken() {
            console.log('mount');
            try {
                const newAccessToken = await http.post('http://localhost:4000/token', { token: localStorage.getItem('refreshToken')});
                if (newAccessToken != null) {
                    localStorage.setItem('accessToken', newAccessToken.data.accessToken);
                }
            } catch(err) {
                console.log('error' + err);
            }
        }
        tryRefreshToken();
        return async () => {
            console.log('cleanup');
            await http.post('http://localhost:4000/logout', { token: localStorage.getItem('refreshToken')} );
        };
    }, []);
    return (
    //    <Router>
    //         <Header />
    //         <main style={{minHeight:"93vh"}}></main>
    //         <Footer />
    //     </Router>
        <Router>
            <Navbar />
            <Routes>
                <Route path = '/' element={<Dashboard/>} />
                <Route path = '/course/:id' element={<Course/>} />
                <Route path = '/login' element={<Login/>} />
                <Route path = '/register' element={<Register/>} />
                <Route path = '/dashboard/' element={<Dashboard/>} />
                <Route path = '/assignment/:id' element={<Assignment/>} />
                <Route path = '/profilepage' element={<ProfilePage/>} />
                <Route path = '/settings' element={<Settings/>} />
            </Routes>
        </Router>
    );
}
