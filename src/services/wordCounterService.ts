import axios from "axios";
import { InputTypes, Result } from "../types/types";
import dotenv from 'dotenv';
import * as fs from 'fs';
import { cleanUpString, getDataFromDbFile, isNotEmpty, isString } from "../utils/utils";
import { NextFunction } from "express";
import stream, { Readable } from 'stream';

dotenv.config();
const XApiKey = process.env.XApiKey;
const dbFile = process.cwd() + "\\db.json"

export const processData = async (value: string, type: string, next: NextFunction) => {

    if (type === InputTypes.STRING) {
        try {
            const reader = Readable.from([value]);
            return handleDataWithChunks(reader, next);
        } catch (e) {
            next(e);
            return;
        }
    }
    else if (type === InputTypes.FILE) {
        try {
            const reader = fs.createReadStream(value, { highWaterMark: 1048576 });
            return handleDataWithChunks(reader, next);
        } catch (e) {
            next(e);
            return;
        }
    }
    else if (type === InputTypes.URL) {
        try {
            const response = await axios({
                method: 'get',
                url: value,
                responseType: 'stream',
                headers: {
                    'X-Api-Key': XApiKey,
                }
            });
            const reader = response.data;
            return handleDataWithChunks(reader, next);
        } catch (e) {
            next(e);
            return;
        }
    }
}

export const addWordsToDB = (dataAsWords: string[], result: Result): void => {
    dataAsWords.forEach((word: string) => {
        word = cleanUpString(word);

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

const handleDataWithChunks = async (reader: stream.Readable, next: NextFunction) => {
    const result = await getDataFromDbFile();
    let counter = 0;

    const newPromise = new Promise((resolve, reject) => {
        reader.on('data', function (chunk) {
            console.time(`Time to handle all chunks`);
            counter++;
            console.time(`Time to handle chunk #${counter}`);
            const dataAsWords = chunk.toString().split(" ");
            addWordsToDB(dataAsWords, result)
            fs.writeFileSync(dbFile, JSON.stringify(result));
            console.timeEnd(`Time to handle chunk #${counter}`);
        });

        reader.on('end', () => {
            console.timeEnd(`Time to handle all chunks`);
            resolve(() => { })
        });
        reader.on('error', (err) => resolve(err));
    })
    return await newPromise;


}