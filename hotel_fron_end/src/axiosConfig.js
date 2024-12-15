import axios from "axios";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
        "Content-Type" : "application/json"
    }
});

/* instance.interceptors.request.use(function (config) {
    const token = localStorage.AUTH_TOKEN;
    config.headers.Authorization =  token ? token : '';
    return config;
}); */

export default instance;