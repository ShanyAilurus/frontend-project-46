import _ from 'lodash';
import fs from "fs";
import path from 'path';
import process from 'process';

const getParseData = (pathToFile) => {
  const absolutePath = path.resolve(process.cwd(), '__fixtures__', pathToFile);
  const fileData = fs.readFileSync(absolutePath).toString();
  return fileData;
};

const getSortedKeys = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const unionKeys = _.union(keys1, keys2); 
  return unionKeys;
}

const gendiff = (filePath1, filePath2) => {
  const firstObj = getParseData(filePath1);
  const secondObj = getParseData(filePath2);
  const dataFirstObj = JSON.parse(firstObj);
  const dataSecondObj = JSON.parse(secondObj);
  const mergedKeys = getSortedKeys(dataFirstObj, dataSecondObj);
  const sorted = _.sortBy(mergedKeys).reduce((acc, val) => {
    const value1 = _.get(dataFirstObj, val, '');
    const value2 = _.get(dataSecondObj, val, '');
    const defaultIndent = '  ';
    if (value1 === value2) {
      return _.concat(...[acc], [`${defaultIndent.repeat(2)}${val}: ${value1}`]);
    }
    if (value1 === '' || value2 === '') {
      const subIndent = value1 === '' ? '+ ' : '- ';
      return _.concat(...[acc], [
        `${defaultIndent}${subIndent}${val}: ${value1}${value2}`,
      ]);
    }
    return _.concat(
      ...[acc],
      [`${defaultIndent}- ${val}: ${value1}`],
      [`${defaultIndent}+ ${val}: ${value2}`],
    );
  }, []);
  const result = ['{', ...sorted, '}'].join('\n');
  console.log(result);
  return result;
};

export default gendiff;