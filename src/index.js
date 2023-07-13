import { parse, iter } from './utils.js';
import formats from '../formatters/index.js';

const gendiff = (filePath1, filePath2, formatter = 'stylish') => {
  const dataObject1 = parse(filePath1);
  const dataObject2 = parse(filePath2);
  const total = iter(dataObject1, dataObject2);
  console.log(formats(total, formatter));
  return formats(total, formatter);
};

export default gendiff;
