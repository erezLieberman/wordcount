import * as fs from 'fs';
import { ParsedQs } from 'qs';

export const cleanUpString = (s: string | (ParsedQs & String) | (string[] & String) | (ParsedQs[] & String)) => {
    return s.toLowerCase().replace(/[^a-z]/gi, '');
}

const dbFile = process.cwd() + "\\db.json";
export const getDataFromDbFile = () => {
    if(!fs.existsSync(dbFile)){
        let result = {}
        fs.writeFileSync(dbFile,JSON.stringify(result));
    }
    return JSON.parse(fs.readFileSync(dbFile).toString());
}

export const isString = (value:any):boolean => (typeof value === 'string' || value instanceof String)

export const isNotEmpty = (value:any):boolean => (isString(value) && value.length !== 0)