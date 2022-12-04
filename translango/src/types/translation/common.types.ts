import { languageType } from './../common/database.types';
// --------->>> TYPES

// TYPE: Type for object recognition's bounding boxes
export type boundingBoxType = {
  upperLeftCorner: number;
  lowerRight: number;
};

// TYPE: Type for translations comming from the database
export type translationType = languageType & {
    translations : string[]
};