import csvParse from 'csv-parse';

/**
 * parse a csv document
 */
export const csvParser = (text: string): Promise<any[]> => {
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
