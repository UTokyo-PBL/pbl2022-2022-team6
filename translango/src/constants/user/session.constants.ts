/*
    Description: Constants for AXIOS (see https://github.com/axios/axios for more)
*/

import { endpointsType } from "../../types/common/axios.types";
import { COMMON_STATUS_CODES } from "../common/axios.constants";

// --------->>> INSTANCES
//INSTANCES: All the entrypoints for https requests
export const SESSION_ENDPOINTS: endpointsType = {
  // TODO: Set the entrypoint URL
  LOGIN: {
    description: "Endpoint for setting a session in the server side",
    url: "/<setithere>",
    statusCodes: {
      success: COMMON_STATUS_CODES.success,
      failure: COMMON_STATUS_CODES.failure,
    },
  },
};
