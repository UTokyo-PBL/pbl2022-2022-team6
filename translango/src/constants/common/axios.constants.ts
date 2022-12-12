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

// INSTANCE: Header name for the user's ID to be stored
export const SESSION_HEADER_NAME = 'UserId';

// INSTANCE: Create an Axios client
export const $axios = axios.create({
  baseURL: "http://104.198.116.249",
  withCredentials: true,
  headers: {
    [SESSION_HEADER_NAME]: getCookie(SESSION_HEADER_NAME),
  },
});

$axios.interceptors.request.use((request) => {
  console.log(request);
  return request;
});

export function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}