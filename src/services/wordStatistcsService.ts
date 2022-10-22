import { isString } from "../utils/utils";

//usually i will use something like express-validator or Joi but here i made those simple validation by myself 
export const validateWordStatisticsBody = (word: any): string | undefined => {
    if (!(word)) {
        return 'word is required'
    }

    if (!(isString(word))) {
        return 'word have to be string :)';
    }
}