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
exports.validateWordCounterBody = exports.addWordsToDB = exports.getData = void 0;
const axios_1 = __importDefault(require("axios"));
const types_1 = require("../types/types");
const dotenv_1 = __importDefault(require("dotenv"));
const fs = __importStar(require("fs"));
const utils_1 = require("../utils/utils");
dotenv_1.default.config();
const XApiKey = process.env.XApiKey;
//TODO add return type of all functions
const getData = (value, type, next) => __awaiter(void 0, void 0, void 0, function* () {
    // i set the data as empty string to avoid ts error of "Variable 'data' is used before being assigned.ts(2454)"
    let data = '';
    if (type === types_1.InputTypes.STRING) {
        data = value;
    }
    else if (type === types_1.InputTypes.FILE) {
        try {
            data = fs.readFileSync(value).toString();
        }
        catch (e) {
            next(e);
            return;
        }
    }
    else if (type === types_1.InputTypes.URL) {
        try {
            const response = yield axios_1.default.get(value, {
                headers: {
                    'X-Api-Key': XApiKey,
                }
            });
            data = response.data;
        }
        catch (e) {
            next(e);
            return;
        }
    }
    return data;
});
exports.getData = getData;
const addWordsToDB = (dataAsWords, result) => {
    dataAsWords.forEach((word) => {
        word = (0, utils_1.cleanUpString)(word);
        if ((0, utils_1.isNotEmpty)(word)) {
            if (word in result) {
                result[word] = result[word] + 1;
            }
            else {
                result[word] = 1;
            }
        }
    });
};
exports.addWordsToDB = addWordsToDB;
//usually i will use something like express-validator or Joi but here i made those simple validation by myself 
const validateWordCounterBody = (value, type) => {
    if (!(value)) {
        return 'Value is required';
    }
    if (!(type)) {
        return 'Type is required';
    }
    if (!Object.values(types_1.InputTypes).includes(type)) {
        return 'invalid type';
    }
    if (!((0, utils_1.isString)(value))) {
        return 'value have to be string';
    }
};
exports.validateWordCounterBody = validateWordCounterBody;
