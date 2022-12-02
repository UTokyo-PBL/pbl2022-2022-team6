// --------->>> INSTANCES
import { ISO639_1LanguageCodeType } from "./common.types";

// INSTANCE: Type for objects stored from images
export type objectType = {
  objectId: string;
  timeStamp: Date;
  userId: string;
  modelOutput: number[];
  english: string;
  url: string;
  latitude?: number;
  longitude?: number;
  caption?: string;
  favourite?: boolean;
  isPublic?: boolean;
  likeCounter?: number;
};

// INSTANCE: Type for the available languages stored on the database
export type languageType = {
  languageId: string;
  timestamp: Date;
  name: string;
  region?: string;
  code: ISO639_1LanguageCodeType; // ISO 639-1 compliant
};

// INSTANCE: Type for users
export type userType = {
  userId: string;
  timestamp: Date;
  name: string;
  nickname?: string;
  email?: string;
  password?: string;
  loginAttempts?: number;
};
