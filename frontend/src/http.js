import axios from 'axios';
const http = axios.create();
http.interceptors.request.use((config) => {
    config.headers.Authorization = "Bearer " + localStorage.getItem('accessToken');
    return config;
}, (error) => {
    return Promise.reject(error);
});
http.interceptors.response.use(response => {return response}, async (error) => {
    const originalRequest = error.config
    if (error?.response?.status === 600 && !originalRequest._retry) {
        originalRequest._retry = true;
        console.log('expired access token error');
        try {
            const newAccessToken = await http.post('http://localhost:4000/token', { token: localStorage.getItem('refreshToken') });
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