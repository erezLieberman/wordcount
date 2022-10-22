import { StatusCodes } from "http-status-codes";
import { cleanUpString, getDataFromDbFile, isString } from "../utils/utils";
import { Request, Response } from 'express';
import { validateWordStatisticsBody } from "../services/wordStatistcsService";

export const wordStatisticsHandler = (req: Request, res: Response): void => {

    let word = req.query.word;
    const isNotValidMessage = validateWordStatisticsBody(word);
    if(isNotValidMessage){
        res
            .status(StatusCodes.UNPROCESSABLE_ENTITY)
            .send(isNotValidMessage);
            return;
    }

    let result;

    if((isString(word) && typeof word === 'string')){
      //isString by itself will be enough here but i keep the other checks to avoid ts warnings and errors
      word = cleanUpString(word);
      const data = getDataFromDbFile();
      result = data[word] || 0;
    }

    res
      .status(StatusCodes.OK)
      .send(JSON.stringify(result));
  }