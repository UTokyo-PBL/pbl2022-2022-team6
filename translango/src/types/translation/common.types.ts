// --------->>> TYPES

import { ISO639_1LanguageCodeType } from "../common/common.types";

// TYPE: Type for object recognition's bounding boxes
export type boundingBoxType = {
  upper_left: xyCoordinate;
  lower_left: xyCoordinate;
  lower_right: xyCoordinate;
  upper_right: xyCoordinate;
};

// TYPE: Type for coordinates
export type xyCoordinate = {
  x: number;
  y: number;
};

// TYPE: Type for translations
export type translationType = {
  text: string;
  language: ISO639_1LanguageCodeType;
  sound_url: string;
};
