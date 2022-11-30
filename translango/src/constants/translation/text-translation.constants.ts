import { GOOGLE_TRANSLATE_API_KEY } from '../common/google.constants';
/*
    Description: Constants for AXIOS (see https://github.com/axios/axios for more)
*/

import { endpointsType } from "../../types/common/axios.types";

// --------->>> INSTANCES
//INSTANCES: All the entrypoints for https requests
export const TRANSLATION_TEXT_ENDPOINTS: endpointsType = {
  TEXT_TRANSLATE: {
    description: "Endpoint for RESTful requests to GOOGLE's translation api",
    url: `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`,
  }
};
