import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// student-specific components
import StudentDashboard from './components/studentComponents/studentDashboard.component';
import StudentCourse from './components/studentComponents/studentCourse.component';
import StudentLogin from './components/studentComponents/studentLogin.component';
import StudentRegister from './components/studentComponents/studentRegister.component';
import StudentAssignment from './components/studentComponents/studentAssignment.component';

// instructor-specific components
import InstructorLogin from './components/instructorComponents/instructorLogin.component';
import InstructorRegister from './components/instructorComponents/instructorRegister.component';
import InstructorDashboard from './components/instructorComponents/instructorDashboard.component';
import InstructorCourse from './components/instructorComponents/instructorCourse.component';
import InstructorNewAssignment from './components/instructorComponents/instructorNewAssignment.component';
import InstructorAssignment from './components/instructorComponents/instructorAssignment.component';

// shared components
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
                <Route path = '/studentLogin' element={<StudentLogin/>} />
                <Route path = '/studentRegister' element={<StudentRegister/>} />
                <Route path = '/studentDashboard' element={<StudentDashboard/>} />
                <Route path = '/studentCourse/:course_id' element={<StudentCourse/>} />
                <Route path = '/studentAssignment/:assignment_id' element={<StudentAssignment/>} />

                <Route path = '/instructorCourse/:course_id' element={<InstructorCourse/>} />
                <Route path = '/instructorRegister' element={<InstructorRegister/>} />
                <Route path = '/instructorDashboard' element={<InstructorDashboard/>} />
                <Route path = '/instructorNewAssignment/:course_id' element={<InstructorNewAssignment/>} />
                <Route path = '/instructorAssignment/:assignment_id' element={<InstructorAssignment/>} />

                <Route path = '/' element={<LandingPage/>} />
                <Route path = '/instructorLogin' element={<InstructorLogin/>} />
                <Route path = '/profilepage' element={<ProfilePage/>} />
                <Route path = '/settings' element={<Settings/>} />
            </Routes>
            <Footer />
        </Router>
    );
}
