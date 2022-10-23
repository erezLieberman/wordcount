import { StatusCodes } from "http-status-codes";
import * as fs from 'fs';
import { getDataFromDbFile } from "../utils/utils";
import dotenv from 'dotenv';
import { addWordsToDB as addWordsToResult, getData, validateWordCounterBody } from "../services/wordCounterService";
import { NextFunction, Request, Response } from 'express';

dotenv.config();

const dbFile = process.cwd() + "\\db.json"

export const wordCounterHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const { value, type } = req.body;

    const isNotValidMessage = validateWordCounterBody(value, type);
    if (isNotValidMessage) {
        res
            .status(StatusCodes.UNPROCESSABLE_ENTITY)
            .send(isNotValidMessage);
        return;
    }

    let data = await getData(value, type, next);

    if(data){
        const result = getDataFromDbFile();

        const dataAsWords = data.split(" ");
    
        addWordsToResult(dataAsWords, result)
    
        fs.writeFileSync(dbFile, JSON.stringify(result));
    
        res
            .status(StatusCodes.OK)
            .send('data proceeded successfully');
    }
}