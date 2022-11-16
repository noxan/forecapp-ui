import { parse as papaParse } from "papaparse";

export const parse = async (source: any, config: object = {}) =>
  await new Promise<any>((resolve, reject) =>
    papaParse(source, {
      dynamicTyping: false,
      header: true,
      ...config,
      complete(results) {
        resolve(results.data);
      },
      error(error) {
        reject(error);
      },
    })
  );
