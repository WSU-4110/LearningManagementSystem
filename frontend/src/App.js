import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentDashboard from './components/studentDashboard.component';
import StudentCourse from './components/studentCourse.component';
import InstructorCourse from './components/instructorCourse.component';
import StudentLogin from './components/studentLogin.component';
import InstructorLogin from './components/instructorLogin.component';
import Assignment from './components/assignment.component';
// import Register from './components/register.component';
import ProfilePage from './components/profilePage.component';
import Footer from './components/Footer/Footer.component';
import Settings from './components/settings.component';
// import InstructorLandingPage from './components/instructorLandingPage.component';
// import StudentLandingPage from './components/studentLandingPage.component';
import StudentRegister from './components/studentRegister.component';
import InstructorRegister from './components/instructorRegister.component';
import LandingPage from './screens/LandingPage.component';

import InstructorDashboard from './components/instructorDashboard.component';
import NewAssignment from './components/newAssignment.component';
import NewNav from './components/newNav/newNav.component';


export default function App() {
    return (
       <Router>                
        <NewNav />
            <Routes>            
                <Route path = '/' element={<LandingPage/>} />
                <Route path = '/instructorCourse/:id' element={<InstructorCourse/>} />
                <Route path = '/studentCourse/:id' element={<StudentCourse/>} />
                <Route path = '/studentLogin' element={<StudentLogin/>} />
                <Route path = '/instructorLogin' element={<InstructorLogin/>} />
                <Route path = '/studentRegister' element={<StudentRegister/>} />
                <Route path = '/instructorRegister' element={<InstructorRegister/>} />
                <Route path = '/studentDashboard' element={<StudentDashboard/>} />
                <Route path = '/instructorDashboard' element={<InstructorDashboard/>} />
                <Route path = '/assignment/:id' element={<Assignment/>} />
                <Route path = '/profilepage' element={<ProfilePage/>} />
                <Route path = '/settings' element={<Settings/>} />
                <Route path = '/newAssignment/:id' element={<NewAssignment/>} />
                {/* <Route path = '/instructorLandingPage' element={<InstructorLandingPage/>} />
                <Route path = '/studentLandingPage' element={<StudentLandingPage/>} /> */}
            </Routes>
            <Footer />
        </Router>
    );
}
