const makeString = (element) => (typeof element === 'string' ? `'${element}'` : `${element}`);

const plain = (file) => {
  const iter = (unit, nameOfProperty, point = false) => {
    const result = unit.reduce((acc, element, index) => {
      const { name, type, children } = element;
      const newValue = Array.isArray(children) ? '[complex value]' : makeString(children);
      const additionalPoint = point ? '.' : '';
      const newProp = `${nameOfProperty}${additionalPoint}${name}`;
      if (type === 'unchanged') {
        return Array.isArray(children) ? [...acc, iter(children, `${newProp}`, true)] : [...acc, []];
      }
      if (type === 'added') return [...acc, `Property '${newProp}' was added with value: ${newValue}`];
      if (type === 'deleted') return [...acc, `Property '${newProp}' was removed`];
      if (type === 'set') {
        const value = Array.isArray(unit[index - 1].children) ? '[complex value]' : makeString(unit[index - 1].children);
        return [...acc, `Property '${newProp}' was updated. From ${value} to ${newValue}`];
      }
      return [...acc, []];
    }, []);
    return result.flat(Infinity).join('\n');
  };
  return iter(file, '');
};

export default plain;