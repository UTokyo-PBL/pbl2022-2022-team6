// --------->>> INSTANCES
// INSTANCE: Structure for the endpoints
export type endpointsType = {
  [constant: string]: {
    description: string;
    url: string;
    statusCodes?: { success?: number[]; failure?: number[] };
  };
};

// INSTANCE: Structure for response coming from backend
export type backendResponseType = {
  outcome : boolean, 
  responnse : any
}