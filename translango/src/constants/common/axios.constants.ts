/*
    Description: Constants for AXIOS (see https://github.com/axios/axios for more)
*/

import axios from "axios";

// --------->>> INSTANCES
// INSTANCES: Generic responseCodes
export const RESPONSE_STATUS_CODES = {
  // SUCCESS Codes
  200: "SUCCESS",
  204: [
    "USER_CREATED_SUCCESSFULY",
    "USER_LOGGED_SUCCESSFULY",
    "USER_EDITED_SUCESSFULY",
  ],

  // FAIL Codes
  400: "FAIL (USUALLY RELATED TO DATA MISSING ON REQUEST)",
  401: ["EMAIL_CONFIRMATION_HAS_EXPIRED", "INVALID_INFO_INPUTED", 'UNAUTHORIZED'],
  404: "RESOURCE_NOT_FOUND",
  409: "USER_ALREADY_EXISTS",
  500 : ['SERVER_DIED', 'REQUESTED INFO NOT FOUND IN DB']
};

// INSTANCE: Set axios' defaults
const axiosInstance = axios.create({
  baseURL: "https://translango.y-nakai.com",
  withCredentials: true,
  headers: {
      withCredentials: 'true',
  },
})

// INSTANCE for directly connecting to backend server by Gaurish
export const gServer = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: {
    withCredentials: 'true',
}
});

export default axiosInstance;
