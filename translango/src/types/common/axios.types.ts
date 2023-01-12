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
  outcome: boolean;
  responnse: any;
};

export interface UserSignUp {
  username: string;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  primary_lang: string;
  password: string;
  favourite_langs: string[];
}

export interface UserFromBackend {
  username: string;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  primary_lang: string;
  primary_language: {
    code: string;
  };
  favourite_languages: [
    {
      code: string;
    }
  ];
  token: {
    access_token_data: string;
    token_type: string;
  };
}
