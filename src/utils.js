import path from 'path';
import fs from 'fs';
import YAML from 'js-yaml';
import _ from 'lodash';

const getSortedKeys = (data1, data2) => {
    const keys1 = data1 ? Object.keys(data1) : [];
    const keys2 = data2 ? Object.keys(data2) : [];
    return _.union(keys1, keys2);
  };

const readFile = (pathToFile) => {
    const absolutePath = path.resolve(process.cwd(), '__fixtures__', pathToFile);
    const fileData = fs.readFileSync(absolutePath).toString();
    return fileData;
};
  
const parse = (file) => {
    const fileType = path.extname(file);
    const data = readFile(file);
    return fileType === '.json' ? JSON.parse(data) : YAML.load(data);
};

export { getSortedKeys, parse};