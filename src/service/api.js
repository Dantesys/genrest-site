import axios from 'axios';
var host = "http://localhost:3030";
var api = axios.create({
    baseURL: host + '/'
});
api.interceptors.response.use(
    response => {
        return response
    },
    error => {
        return Promise.reject(error.response.data)
    }
);
api.interceptors.request.use( async config => {
    return config;
});
export{
    api
};