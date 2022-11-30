// --------->>> INSTANCES
// INSTANCE: Structure for the endpoints
export type endpointsType = {
  [constant: string]: {
    description: string;
    url: string;
    statusCodes?: { success?: number; failure?: number[] };
  };
};

// INSTANCE: Structure for AXIOS responses
export type axiosResponse = {
  statusCode: number;
  body?: any;
};
