import plain from './plain.js';
import stylish from './stylish.js';

const format = (obj, formatter) => {
  switch (formatter) {
    case 'stylish':
      return stylish(obj);
    case 'plain':
      return plain(obj);
    case 'json':
      return JSON.stringify(obj);
    default:
      throw new Error(`Unexpected format: ${formatter}!`);
  }
};

export default format;
