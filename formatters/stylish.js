import _ from 'lodash';

const indent = 4;
const getIndentedInLine = (depth) => `  ${' '.repeat(indent).repeat(depth - 1)}`;
const getIndentedWithParenthesis = (depth) => `${' '.repeat(indent).repeat(depth)}`;
const genLine = (key, value, char, depth) => `${getIndentedInLine(depth)}${char}${key}: ${value}`;
const WrapInParentheses = (body, depth) => `{\n${body}\n${getIndentedWithParenthesis(depth)}}`;

const formatValue = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const entries = Object.entries(value);
  const items = entries.map(([key, val]) => genLine(key, formatValue(val, depth + 1), '  ', depth + 1));
  const body = items.join('\n');
  return WrapInParentheses(body, depth);
};

const processDiff = (diff, depth) => {
  const signs = {
    added: '+ ',
    deleted: '- ',
    unchanged: '  ',
  };

  const items = diff.flatMap(({ key, value, type }) => {
    switch (type) {
      case 'complex':
        return genLine(key, processDiff(value, depth + 1), '  ', depth + 1);
      case 'updated':
        return [genLine(key, formatValue(value.oldValue, depth + 1), signs.deleted, depth + 1),
          genLine(key, formatValue(value.newValue, depth + 1), signs.added, depth + 1)];
      default:
        return genLine(key, formatValue(value, depth + 1), signs[type], depth + 1);
    }
  });
  const body = items.join('\n');
  return WrapInParentheses(body, depth);
};

const stylish = (diff) => processDiff(diff, 0);

export default stylish;
