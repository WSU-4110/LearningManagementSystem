import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// student-specific components
import StudentDashboard from './components/studentComponents/studentDashboard.component';
import StudentCourse from './components/studentComponents/studentCourse.component';
import StudentLogin from './components/studentComponents/studentLogin.component';
import StudentRegister from './components/studentComponents/studentRegister.component';

// instructor-specific components
import InstructorLogin from './components/instructorComponents/instructorLogin.component';
import InstructorRegister from './components/instructorComponents/instructorRegister.component';
import InstructorDashboard from './components/instructorComponents/instructorDashboard.component';
import InstructorCourse from './components/instructorComponents/instructorCourse.component';
import InstructorNewAssignment from './components/instructorComponents/instructorNewAssignment.component';

// shared components
import Assignment from './components/assignment.component';
import ProfilePage from './components/profilePage.component';
import Footer from './components/Footer/Footer.component';
import Settings from './components/settings.component';
import LandingPage from './screens/LandingPage.component';
import NewNav from './components/newNav/newNav.component';

export default function App() {
    return (
       <Router>                
            <NewNav />
            <Routes>
                <Route path = '/' element={<LandingPage/>} />
                <Route path = '/instructorCourse/:course_id' element={<InstructorCourse/>} />
                <Route path = '/studentCourse/:course_id' element={<StudentCourse/>} />
                <Route path = '/studentLogin' element={<StudentLogin/>} />
                <Route path = '/instructorLogin' element={<InstructorLogin/>} />
                <Route path = '/studentRegister' element={<StudentRegister/>} />
                <Route path = '/instructorRegister' element={<InstructorRegister/>} />
                <Route path = '/studentDashboard' element={<StudentDashboard/>} />
                <Route path = '/instructorDashboard' element={<InstructorDashboard/>} />
                <Route path = '/assignment/:assignment_id' element={<Assignment/>} />
                <Route path = '/profilepage' element={<ProfilePage/>} />
                <Route path = '/settings' element={<Settings/>} />
                <Route path = '/instructorNewAssignment/:course_id' element={<InstructorNewAssignment/>} />
            </Routes>
            <Footer />
        </Router>
    );
}
