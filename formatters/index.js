import plain from './plain.js';
import stylish from './stylish.js';

const format = (file, format = 'stylish') => (format === 'stylish' ? stylish(file) : plain(file));

export default format;