import axios from "axios"
import { getAccessToken } from "../utils/utility.js";

const API_RESULT = {
    loading: {
        title: "Loading...",
        message: "Data is being loaded. Please wait"
    },
    success: {
        title: "Success",
        message: "Data successfully loaded"
    },
    noResponse: {
        title: "Error!",
        message: "No response !!"
    },
    responseFailure: {
        title: "Error!",
        message: "An error occur while fetching response from server. Please try again"
    },
    otherReason: {
        title: "Error!",
        message: "Unable to connect to the server. Please check internet connectivity and try again."
    }
}

const BASE_URL = ""
const axioss = axios.create({
    baseURL:BASE_URL,
    timeout:10000,
    headers: {
        "content-type": "application/json"
    }
})

axioss.interceptors.request.use(
    function (request) {
        console.log(request)
        return request;
    },
    function(error) {
        return Promise.reject(error);
    }
)

axioss.interceptors.response.use(
    function (response) {
        return processResponse(response);
    },
    function (error) {
        return Promise.reject(processError(error));
    }
)

///////////////////////////////
// If success -> returns { isSuccess: true, data: object }  (200)
// If fail -> returns { isSuccess: false, status: int, msg: string } (201-299)
// If error -> return {is error: true,status: int, msg: Object} ( not 2XX or network failure or no response)
//////////////////////////////

function processResponse(response) {
    if(response?.status === 200) {
        return {
            isSuccess: true, 
            data: response.data
        }
    }
    return {
        isSuccess: false,
        status: response?.status,
        msg: response?.msg
    }
}

function processError(error) {
    if(error.response) {
        // some other status
        return {
            isError: true,
            msg: API_RESULT.responseFailure,
            code: error.response.status
        }
    }
    else if(error.request) {
        // no response
        console.log("ERROR IN RESPONSE: ", error.toJSON());
        return {
            isError: true,
            msg: API_RESULT.noResponse,
            code: ""
        }
    }
    else {
        // I think invalid response / network error
        console.log("ERROR IN RESPONSE: ", error.toJSON()); 
        return {
            isError: true,
            msg: API_RESULT.otherReason,
            code: ""
        }
    }
}

const apiCall = (value, body, showUploadProgress, showDownloadProgress) =>
        axioss({
            method: value.method,
            url: value.url,
            data: value.method == 'DELETE' ? {} : body,
            params: value.param ? {
                category: value.param
            } : null,
            responseType: value.responseType,
            headers: {
                authorization: getAccessToken()
            },
            onUploadProgress: function(progressEvent) {
                if (showUploadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: function(progressEvent) {
                if (showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            }
        });

const apii = {
    userLogin: { url: '/login', method: 'POST' },
    userSignup: { url: '/signup', method: 'POST' },
    getAllPosts: { url: '/posts', method: 'GET', params: true },
    getRefreshToken: { url: '/token', method: 'POST' },
    uploadFile: { url: 'file/upload', method: 'POST' },
    createPost: { url: 'create', method: 'POST' },
    deletePost: { url: 'delete', method: 'DELETE', query: true },
    getPostById: { url: 'post', method: 'GET', query: true },
    newComment: { url: '/comment/new', method: 'POST' },
    getAllComments: { url: 'comments', method: 'GET', query: true },
    deleteComment: { url: 'comment/delete', method: 'DELETE', query: true },
    updatePost: { url: 'update', method: 'PUT', query: true }
}

export {apii, apiCall};