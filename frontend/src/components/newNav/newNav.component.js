import { Component } from 'react';
import './newNav.css';
import { menuItems } from './menuItems';
import { Link } from 'react-router-dom';
import http from '../../http';
import logoImage from '../../css/logoTransp.png'



// async function handleLogout() {
//     await http.post('http://localhost:4000/logout', {token: localStorage.getItem('refreshToken')});
// }

class newNav extends Component{
    state = {clicked: false};

    handleClick = () =>{
        this.setState({ clicked: !this.state.clicked})
    }



    render(){
        return (
            <nav className='NavbarItems'>
                <div className='navbar-logo'>
                    <Link to="/">
                        <img src={logoImage} alt="Logo" className="logo-image" />
                    </Link>
                </div>

                <div className='menu-icons' onClick={this.handleClick}>
                    <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
                </div>

                <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
                    {menuItems.map((item,index) =>{
                        return(
                            <li key={index}>
                                <Link className={item.cName} to={item.url}><i className={item.icon}></i>{item.title}</Link>
                            </li>
                        )
                    })}

                    {/* <li className='NavBar'><Link onClick={handleLogout}>Logout</Link></li> */}
                </ul>
            </nav>
        )
    }
}
export default newNav