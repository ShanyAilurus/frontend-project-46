import YAML from 'js-yaml';

const parse = (data, type) => (type === '.json' ? JSON.parse(data) : YAML.load(data));

export default parse;
