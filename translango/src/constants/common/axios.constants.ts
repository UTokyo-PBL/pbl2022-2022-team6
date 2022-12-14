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
  400: "FAIL (USUALLY RELATED TO DATA MISSING)",
  401: ["EMAIL_CONFIRMATION_HAS_EXPIRED", "INVALID_INFO_INPUTED"],
  404: "RESOURCE_NOT_FOUND",
  409: "USER_ALREADY_EXISTS",
};

// INSTANCE: Set axios' defaults
axios.defaults.baseURL = "https://translango.y-nakai.com";
//axios.defaults.baseURL = "http://104.198.116.249";
axios.defaults.withCredentials = true;
