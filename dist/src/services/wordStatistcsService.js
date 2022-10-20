"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateWordStatisticsBody = void 0;
const utils_1 = require("../utils/utils");
//usually i will use something like express-validator or Joi but here i made those simple validation by myself 
const validateWordStatisticsBody = (word) => {
    if (!(word)) {
        return 'word is required';
    }
    if (!((0, utils_1.isString)(word))) {
        return 'word have to be string :)';
    }
};
exports.validateWordStatisticsBody = validateWordStatisticsBody;
