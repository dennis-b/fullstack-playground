import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {DEV_BASE_URL, PROD_BASE_URL} from "./api.constants";
import {createBrowserHistory} from "history";

const history = createBrowserHistory();

const api: AxiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? DEV_BASE_URL : PROD_BASE_URL,
});

const requestHandler = (request: AxiosRequestConfig<any>) => {
    // request.headers = getRequestOptions();
    return request;
};

const responseHandler = (response: AxiosResponse) => {
    if (response.status === 401) {
        // setUserToken(null)
        history.push('/login');
    }
    return response.data;
};

const errorHandler = (error: AxiosError) => {
    if (error.request.status === 401) {
        // setUserToken(null)
        history.push('/login');
    }
    const serverError = error.response?.data.msg
    return Promise.reject({...error, serverError})
};

api.interceptors.request.use(
    requestHandler,
    errorHandler
);

api.interceptors.response.use(
    responseHandler,
    errorHandler
);

export default api;