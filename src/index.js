import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';
import process from 'process';

const getParseData = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const readJson = readFileSync(absolutePath, 'utf-8');
  const result = JSON.parse(readJson);
  return result;
  };

const getSortedKeys = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const unionKeys = _.union(keys1, keys2); 
  const sortedKeys = _.sortBy(unionKeys);
  return sortedKeys;
}

const gendiff = (filePath1, filePath2) => {
  const firstObj = getParseData(filePath1);
  const secondObj = getParseData(filePath2);
  const keys = getSortedKeys(firstObj, secondObj);
  const conditions = keys.reduce((acc, key) => {
    if (!_.has(firstObj, key)) {
      acc[`+ ${key}`] = secondObj[key];
    } else if (!_.has(firstObj, key)) {
      acc[`- ${key}`] = firstObj[key];
    } else if (firstObj[key] !== secondObj[key]) {
      acc[`- ${key}`] = firstObj[key];
      acc[`+ ${key}`] = secondObj[key];
    } else if (firstObj[key] === secondObj[key]) {
      acc[`  ${key}`] = firstObj[key];
    }
    return acc;
  }, {});
  const convertObjInString = JSON.stringify(conditions, null, '  ');
  return convertObjInString.replace(/"/gi, '').replace(/,/gi, '');
};

export default gendiff;