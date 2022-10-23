import axios from "axios";
import { InputTypes, Result } from "../types/types";
import dotenv from 'dotenv';
import * as fs from 'fs';
import { cleanUpString, isNotEmpty, isString } from "../utils/utils";
import { NextFunction } from "express";

dotenv.config();
const XApiKey = process.env.XApiKey;

//TODO add return type of all functions
export const getData = async (value: string, type: string, next: NextFunction): Promise<string | undefined> => {
    
    // i set the data as empty string to avoid ts error of "Variable 'data' is used before being assigned.ts(2454)"
    let data: string = '';

    if (type === InputTypes.STRING) {
        data = value;
    }
    else if (type === InputTypes.FILE) {
        try {
            data = fs.readFileSync(value).toString();
        } catch (e) {
            next(e);
            return;
        }
    }
    else if (type === InputTypes.URL) {
        try {
            const response = await axios.get(value, {
                headers: {
                    'X-Api-Key': XApiKey,
                }
            });
            data = response.data;
        } catch (e) {
            next(e);
            return;
        }
    }

    return data;
}

export const addWordsToDB = (dataAsWords: string[], result: Result): void => {
    dataAsWords.forEach((word: string) => {

        if (isNotEmpty(word)) {
            if (word in result) {
                result[word] = result[word] + 1;
            }
            else {
                result[word] = 1;
            }
        }
    });
}

//usually i will use something like express-validator or Joi but here i made those simple validation by myself 
export const validateWordCounterBody = (value: any, type: InputTypes) => {
    if (!(value)) {
        return 'Value is required'
    }

    if (!(type)) {
        return 'Type is required';
    }

    if (!Object.values(InputTypes).includes(type as InputTypes)) {
        return 'invalid type';
    }

    if (!(isString(value))) {
        return 'value have to be string';
    }
}