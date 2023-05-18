import { ParseError, ParseResult, parse as papaParse } from "papaparse";
import { ErrorLevel } from "./store/datasets";

export const parse = async (source: any, download: boolean = false) =>
  new Promise<ParseResult<{ [key: string]: any }>>((resolve, reject) =>
    papaParse<{ [key: string]: any }>(source, {
      dynamicTyping: false,
      header: true,
      skipEmptyLines: true,
      // Have to do this weird thing to get the typing to work correctly
      ...{ download: download },
      complete(results) {
        resolve(results);
      },
      error(error) {
        reject(error);
      },
    })
  );
