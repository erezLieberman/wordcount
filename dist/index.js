"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const wordCounterHandler_1 = require("./src/handlers/wordCounterHandler");
const wordStatisticsHandler_1 = require("./src/handlers/wordStatisticsHandler");
const error_middleware_1 = __importDefault(require("./src/middleware/error.middleware"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use(express_1.default.json());
app.post('/word-counter', wordCounterHandler_1.wordCounterHandler);
app.get('/word-statistics', wordStatisticsHandler_1.wordStatisticsHandler);
app.use(error_middleware_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running! at https://localhost:${port}`);
});
