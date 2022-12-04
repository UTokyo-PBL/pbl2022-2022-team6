/*
    Description: Constants for AXIOS (see https://github.com/axios/axios for more)
*/

import axios from "axios";
import CookieController from "../../api/common/cookie.handler";

// --------->>> INSTANCES
// INSTANCES: Generic responseCodes
export const COMMON_STATUS_CODES = {
  success: [200],
  failure: [400],
};

// INSTANCE: Create an Axios client
export const $axios = axios.create({
  baseURL: 'https://set.this.up'
});

// INSTANCES: Axios request interceptors
$axios.interceptors.request.use(async (request) => {
  // Get the cookie's userId parameter
  const userId = CookieController.getCookie({ cookieName: "userId" });

  // Set it as a new parameter
  request.data.userId = userId;

  console.log(request.data)

  // Allow the promise to continue
  return request;
});