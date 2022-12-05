import { objectType } from './../common/database.types';

// --------->>> TYPES

// TYPE: Type for gamification outcome's items (basically the same than object, but with an added flag to know the outcome)
export type gamificationFlashcardOutcomeType = objectType & {
    userSelectedCorrectly: boolean;
  };