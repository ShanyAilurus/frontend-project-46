import path from 'path';
import fs from 'fs';
import format from '../formatters/index.js';
import iter from './tree_builder.js';
import parse from './parser.js';

const readFile = (pathToFile) => {
  const absolutePath = path.resolve(process.cwd(), '__fixtures__', pathToFile);
  const fileData = fs.readFileSync(absolutePath).toString();
  return fileData;
};

const getFileType = (file) => path.extname(file);

const gendiff = (filePath1, filePath2, formatter = 'stylish') => {
  const data1 = readFile(filePath1);
  const fileType1 = getFileType(filePath1);
  const dataObject1 = parse(data1, fileType1);

  const data2 = readFile(filePath2);
  const fileType2 = getFileType(filePath2);
  const dataObject2 = parse(data2, fileType2);

  const total = iter(dataObject1, dataObject2);
  return format(total, formatter);
};

export default gendiff;
