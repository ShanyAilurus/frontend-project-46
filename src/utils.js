import path from 'path';
import fs from 'fs';
import YAML from 'js-yaml';
import _ from 'lodash';

const getSortedKeys = (data1, data2) => {
  const keys1 = data1 ? Object.keys(data1) : [];
  const keys2 = data2 ? Object.keys(data2) : [];
  return _.sortBy(_.union(keys1, keys2));
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

const iter = (dataObject1, dataObject2) => {
  const sortedKeys = getSortedKeys(dataObject1, dataObject2);

  const getDiff = (key) => {
    if (!_.has(dataObject1, key)) {
      return { key, type: 'added', value: dataObject2[key] };
    }

    if (!_.has(dataObject2, key)) {
      return { key, type: 'deleted', value: dataObject1[key] };
    }

    if (dataObject1[key] === dataObject2[key]) {
      return { key, type: 'unchanged', value: dataObject1[key] };
    }

    if (_.isObject(dataObject1[key]) && _.isObject(dataObject2[key])) {
      return { key, type: 'complex', value: iter(dataObject1[key], dataObject2[key]) };
    }

    return { key, type: 'updated', value: { oldValue: dataObject1[key], newValue: dataObject2[key] } };
  };

  const diffItems = sortedKeys.flatMap(getDiff);
  return diffItems;
};

export { parse, iter };
