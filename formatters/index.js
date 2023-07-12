import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const format = (obj, format) => {
    console.log(format);
  switch (format) {
    case 'stylish':
      return stylish(obj);
    case 'plain':
      return plain(obj);
    case 'json':
      return json(obj);
    default:
      throw new Error(`Unexpected format: ${format}!`);
  }
};

export default format;