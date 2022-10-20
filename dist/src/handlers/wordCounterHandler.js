"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wordCounterHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const fs = __importStar(require("fs"));
const utils_1 = require("../utils/utils");
const dotenv_1 = __importDefault(require("dotenv"));
const wordCounterService_1 = require("../services/wordCounterService");
dotenv_1.default.config();
const dbFile = process.cwd() + "\\db.json";
const wordCounterHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { value, type } = req.body;
    const isNotValidMessage = (0, wordCounterService_1.validateWordCounterBody)(value, type);
    if (isNotValidMessage) {
        res
            .status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY)
            .send(isNotValidMessage);
        return;
    }
    let data = yield (0, wordCounterService_1.getData)(value, type, next);
    if (data) {
        const result = (0, utils_1.getDataFromDbFile)();
        const dataAsWords = data.toLowerCase().split(" ");
        (0, wordCounterService_1.addWordsToDB)(dataAsWords, result);
        fs.writeFileSync(dbFile, JSON.stringify(result));
        res
            .status(http_status_codes_1.StatusCodes.OK)
            .send(result);
    }
});
exports.wordCounterHandler = wordCounterHandler;
