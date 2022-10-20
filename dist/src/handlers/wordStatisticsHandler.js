"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wordStatisticsHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../utils/utils");
const wordStatistcsService_1 = require("../services/wordStatistcsService");
const wordStatisticsHandler = (req, res) => {
    let word = req.query.word;
    const isNotValidMessage = (0, wordStatistcsService_1.validateWordStatisticsBody)(word);
    if (isNotValidMessage) {
        res
            .status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY)
            .send(isNotValidMessage);
        return;
    }
    let result;
    if (((0, utils_1.isString)(word) && typeof word === 'string' || word instanceof String)) {
        //isString by itself will be enough here but i keep the other checks to avoid ts warnings and errors
        word = word.toLowerCase();
        const data = (0, utils_1.getDataFromDbFile)();
        result = data[word] || 0;
    }
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .send(JSON.stringify(result));
};
exports.wordStatisticsHandler = wordStatisticsHandler;
