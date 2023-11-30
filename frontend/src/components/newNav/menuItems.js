import http from "../../http";


// async function handleLogout() {
//     await http.post('http://localhost:4000/logout', {token: localStorage.getItem('refreshToken')});
// }

export const menuItems = [
    {
        title : "Dashboard",
        url : "/dashboard",
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
    // {
    //     title : "Logout",
    //     onclick : {handleLogout},
    //     cName : "nav-links",
    //     icon : ""
    // },
    
    
]