import { Component } from 'react';
import './newNav.css';
import { Link } from 'react-router-dom';
import http from '../../http';
import logoImage from '../../css/logoTransp.png'

class newNav extends Component {
    state = { clicked: false, role: '' };

    async componentDidMount() {
        const roleCall = parseInt(localStorage.getItem('roleCall'), 10);
        console.log(roleCall);
        if (roleCall === 0) {
            this.setState({ role: 'student' });
            console.log("Has been set as student.");
        } else if (roleCall === 1) {
            this.setState({ role: 'instructor' });
            console.log("Has been set as instructor.");
        }
    }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked });
    }

    handleLogout = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        await http.post('http://localhost:4000/logout', { refreshToken });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.localStorage.clear();
        console.log("Logout successful");
    }

    render() {
        const dashboardUrl = `/${this.state.role}Dashboard`;

        const menuItems = [
            {
                title: "Dashboard",
                url: "/studentDashboard",
                cName: "nav-links",
                icon: "fa-solid fa-house"
            },
            {
                title: "Profile",
                url: "/profilepage",
                cName: "nav-links",
                icon: ""
            },
            {
                title: "Settings",
                url: "/settings",
                cName: "nav-links",
                icon: ""
            },
            {
                title: "Logout",
                onClick: this.handleLogout,
                url: "/",
                cName: "nav-links",
                icon: ""
            },
        ];

        return (
            <nav className='NavbarItems'>
                <div className='navbar-logo'>
                    <img src={logoImage} alt="Logo" className="logo-image" />
                </div>

                <div className='menu-icons' onClick={this.handleClick}>
                    <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
                </div>

                <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
                    {menuItems.map((item, index) => {
                        const dynamicUrl = item.title === 'Dashboard' ? dashboardUrl : item.url;

                        return (
                            <li key={index}>
                                <Link className={item.cName} to={dynamicUrl} onClick={item.onClick}>
                                    <i className={item.icon}></i>{item.title}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        )
    }
}

export default newNav;
