import http from "../../http";
import {DATA_SERVER_URL} from '../../constants';



async function handleLogout() {
    await http.post(DATA_SERVER_URL, {token: localStorage.getItem('refreshToken')});
}

export const menuItems = [
    {
        title : "Dashboard",
        url : "/studentDashboard",
        cName : "nav-links",
        icon : "fa-solid fa-house"
    },
    {
        title : "Profile",
        url : "/profilepage",
        cName : "nav-links",
        icon : ""
    },
    {
        title : "Settings",
        url : "/settings",
        cName : "nav-links",
        icon : ""
    },
    {
        title : "Logout",
        onclick : {handleLogout},
        cName : "nav-links",
        icon : ""
    },
    
    
]