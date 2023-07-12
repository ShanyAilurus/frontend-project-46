import { parse, iter } from './utils.js';
import format from '../formatters/index.js';
import _ from 'lodash';

const gendiff = (filePath1, filePath2, formatter) => {
    const dataObject1 = parse(filePath1);
    const dataObject2 = parse(filePath2);
    const total = iter(dataObject1, dataObject2, true);
    console.log(format(total, formatter));
    return format(total, formatter);
  };


export default gendiff;