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
  baseURL: 'https://'
});

// INSTANCES: Axios request interceptors
$axios.interceptors.request.use(async (request: any) => {
  // Get the cookie's userId parameter
  const cookie = CookieController.getCookie({ cookieName: "userId" });

  // Set it as a new parameter
  request.headers = { cookie };

  console.log(request)

  // Allow the promise to continue
  return request;
});