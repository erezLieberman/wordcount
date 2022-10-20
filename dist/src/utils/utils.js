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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotEmpty = exports.isString = exports.getDataFromDbFile = exports.cleanUpString = void 0;
const fs = __importStar(require("fs"));
const cleanUpString = (s) => {
    return s.replace(/[^a-z]/gi, '');
};
exports.cleanUpString = cleanUpString;
const dbFile = process.cwd() + "\\db.json";
const getDataFromDbFile = () => {
    if (!fs.existsSync(dbFile)) {
        let result = {};
        fs.writeFileSync(dbFile, JSON.stringify(result));
    }
    return JSON.parse(fs.readFileSync(dbFile).toString());
};
exports.getDataFromDbFile = getDataFromDbFile;
const isString = (value) => (typeof value === 'string' || value instanceof String);
exports.isString = isString;
const isNotEmpty = (value) => ((0, exports.isString)(value) && value.length !== 0);
exports.isNotEmpty = isNotEmpty;
