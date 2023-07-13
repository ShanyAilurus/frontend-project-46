import _ from 'lodash';

const formatValue = (value) => {
  if (_.isString(value)) {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const plain = (diff, path = []) => {
  const filterItems = diff.filter(({ type }) => type !== 'unchanged');

  const items = filterItems.map(({ key, value, type }) => {
    const newPath = path.concat(key);
    const node = newPath.join('.');
    switch (type) {
      case 'added': {
        const val = formatValue(value);
        return `Property '${node}' was added with value: ${val}`;
      }
      case 'deleted':
        return `Property '${node}' was removed`;
      case 'updated': {
        const { oldValue, newValue } = value;
        const oldVal = formatValue(oldValue);
        const newVal = formatValue(newValue);
        return `Property '${node}' was updated. From ${oldVal} to ${newVal}`;
      }
      default:
        return plain(value, newPath);
    }
  });
  return items.join('\n');
};

export default plain;
