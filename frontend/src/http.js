import axios from 'axios';
const http = axios.create({headers: {
    '_retry': false
}});
http.interceptors.request.use((config) => {
    config.headers.Authorization = "Bearer " + localStorage.getItem('accessToken');
    return config;
}, (error) => {
    return Promise.reject(error);
});
http.interceptors.response.use(response => {return response}, async (error) => {
    const originalRequest = error.config;
    // tempermanent
    if (error?.response?.status === 403)
        console.log(`expired access token error. _retry ${originalRequest.headers._retry}`);
    if (error?.response?.status === 403 && !originalRequest.headers._retry) {
        originalRequest.headers._retry = true;
        try {
            const newAccessToken = await http.post('http://localhost:4000/token', {token: localStorage.getItem('refreshToken')}, {
                headers: {
                    '_retry': true
                }
            });
            if (newAccessToken != null) {
                localStorage.setItem('accessToken', newAccessToken.data.accessToken);
                return http(originalRequest);
            }
        } catch {
            return Promise.reject(error);
        }
    }
});
export default http;