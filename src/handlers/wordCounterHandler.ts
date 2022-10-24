import { StatusCodes } from "http-status-codes";
import dotenv from 'dotenv';
import { processData, validateWordCounterBody } from "../services/wordCounterService";
import { NextFunction, Request, Response } from 'express';

dotenv.config();

export const wordCounterHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const { value, type } = req.body;

    const isNotValidMessage = validateWordCounterBody(value, type);
    if (isNotValidMessage) {
        res
            .status(StatusCodes.UNPROCESSABLE_ENTITY)
            .send(isNotValidMessage);
        return;
    }
   
    let data = await processData(value, type, next);
    
    if(data instanceof Error){
        next(data);
    }else{
        res
            .status(StatusCodes.OK)
            .send('data proceeded successfully');
    }
}