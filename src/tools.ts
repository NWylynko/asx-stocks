import csvParse from 'csv-parse';
import xlsx from 'xlsx';

/**
 * parse a csv document
 */
export const csvParser = (text: string | Buffer): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    csvParse(text, {}, (err: Error | undefined, parsed: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(parsed);
      }
    });
  });
};

export const xlsxParser = (text: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    let parsed;
    try {
      parsed = xlsx.read(text);
      resolve(xlsxToJson(parsed))
    } catch (error) {
      reject(error)
    }
  })
}

interface Result {
  sheetName?: unknown[];
}

const xlsxToJson = (workbook: xlsx.WorkBook): Result => {
  let result: Result = {};
  workbook.SheetNames.forEach(sheetName => {
    var roa = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], {header:1});
    if(roa.length) result.sheetName = roa;
  });
  return result
};

/**
 * remove the first n amount of lines from a string
 * @param {string} text any string with lines in it '\n'
 * @param {number} n number of lines to remove from the start
 */
export const removeLinesFromStart = async (text: string, n: number): Promise<string> => {
  // break the textblock into an array of lines
  const lines = text.split('\n');
  // remove two lines, starting at the first position
  lines.splice(0, n);
  // join the array back into a single string
  return lines.join('\n');
};
