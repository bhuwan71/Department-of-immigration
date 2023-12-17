import axios from 'axios'
// import { encryptToken, decryptToken } from '../utils/cryptoUtils';
// import { getLocalStorageItem } from '../utils/localStorageUtil';

const apiInstance = axios.create({
  baseURL: 'http://192.168.1.80:5000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a single interceptor to handle requests
// apiInstance.interceptors.request.use(
//     (config) => {
//         const encryptTokenData = getLocalStorageItem("access_token");
//         const decryptTokenData = decryptToken(encryptTokenData as string);
//         const token = decryptTokenData;

//         // If the token exists and the request is not a FormData request, add it to the Authorization header
//         if (token && !(config.data instanceof FormData)) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }

//         // Check if the request contains FormData (for file uploads)
//         if (config.data instanceof FormData) {
//             // Update the Content-Type header for FormData
//             config.headers['Content-Type'] = 'multipart/form-data';
//         }

//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

export default apiInstance
