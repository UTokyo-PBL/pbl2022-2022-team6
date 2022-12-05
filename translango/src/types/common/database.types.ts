import {
  boundingBoxType,
  translationType,
} from "./../translation/common.types";
// --------->>> INSTANCES
import { ISO639_1LanguageCodeType, locationType } from "./common.types";

// INSTANCE: Type for objects stored from images
export type itemType = {
  id: string;
  original: translationType;
  translated: translationType[];
  bbox: boundingBoxType;
  image_url: string;
  location: locationType;
  country: string;
  city: string;
  liked: boolean;
  num_failures: boolean;
  caption: string;
};

// INSTANCE: Type for the available languages stored on the database
export type languageType = {
  id?: string;
  name?: string;
  code: ISO639_1LanguageCodeType; // ISO 639-1 compliant
};

// INSTANCE: Type for the available lists in database
export type listType = {
  id?: string;
  name?: string;
  icon_name: string;
  items?: itemType[];
};

// INSTANCE: Type for users
export type userType = {
  id?: string;
  timestamp?: Date;
  email: string;
  password: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  username?: string;
  language: languageType;
  loginAttempts?: number;
};
