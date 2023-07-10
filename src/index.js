import { getSortedKeys, parse } from './utils.js';
import format from '../formatters/index.js';
import _ from 'lodash';

const gendiff = (filePath1, filePath2, formatter) => {
    const dataObject1 = parse(filePath1);
    const dataObject2 = parse(filePath2);
    const iter = (data1, data2, changeKey = true) => {
      const sortKeys = _.sortBy(getSortedKeys(data1, data2));
      const delType = changeKey ? 'deleted' : 'unchanged';
      const addType = changeKey ? 'added' : 'unchanged';
      return sortKeys.reduce((acc, element) => {
        const children1 = _.get(data1, element);
        const children2 = _.get(data2, element);
        if (!_.isObject(children1) && !_.isObject(children2)) {
          if (children1 === children2) {
            return [...acc, { name: element, type: 'unchanged', children: children1 }];
          }
          if (children1 !== undefined && children2 !== undefined) {
            return [...acc, { name: element, type: 'changed', children: children1 },
              { name: element, type: 'set', children: children2 }];
          }
          return children1 === undefined ? [...acc, { name: element, type: `${addType}`, children: children2 }]
            : [...acc, { name: element, type: `${delType}`, children: children1 }];
        }
        if (_.isObject(children1) && _.isObject(children2)) {
          return [...acc, { name: element, type: 'unchanged', children: iter(children1, children2) }];
        }
        if (_.isObject(children1) && children2 !== undefined) {
          return [...acc, { name: element, type: 'changed', children: iter(children1, {}, false) },
            { name: element, type: 'set', children: children2 }];
        }
        if (_.isObject(children2) && children1 !== undefined) {
          return [...acc, { name: element, type: 'changed', children: children1 },
            { name: element, type: 'set', children: iter({}, children2) }];
        }
        return children1 ? [...acc, { name: element, type: `${delType}`, children: iter(children1, {}, false) }]
          : [...acc, { name: element, type: `${addType}`, children: iter({}, children2, false) }];
      }, []);
    };
    const total = iter(dataObject1, dataObject2, true);
    console.log(format(total, formatter));
    return format(total, formatter);
  };


export default gendiff;