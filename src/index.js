import { getSortedKeys, parse } from './utils.js';
import stylish from './stylish.js'
import _ from 'lodash';

const gendiff = (filePath1, filePath2, formatter = stylish) => {
    const dataObject1 = parse(filePath1);
    const dataObject2 = parse(filePath2);
    const iter = (data1, data2, changeKey = true) => {
      const sortKeys = _.sortBy(getSortedKeys(data1, data2));
      const unchangeType = 'unchanged';
      const oldType = changeKey ? 'deleted' : 'unchanged';
      const newType = changeKey ? 'added' : 'unchanged';
      return sortKeys.reduce((acc, element) => {
        const children1 = _.get(data1, element);
        const children2 = _.get(data2, element);
        if (!_.isObject(children1) && !_.isObject(children2)) {
          if (children1 === children2) {
            return [...acc, { name: element, type: `${unchangeType}`, children: children1 }];
          }
          if (children1 !== undefined && children2 !== undefined) {
            return [...acc, { name: element, type: `${oldType}`, children: children1 },
              { name: element, type: `${newType}`, children: children2 }];
          }
          return children1 === undefined ? [...acc, { name: element, type: `${newType}`, children: children2 }]
            : [...acc, { name: element, type: `${oldType}`, children: children1 }];
        }
        if (_.isObject(children1) && _.isObject(children2)) {
          return [...acc, { name: element, type: `${unchangeType}`, children: iter(children1, children2) }];
        }
        if (_.isObject(children1) && children2 !== undefined) {
          return [...acc, { name: element, type: `${oldType}`, children: iter(children1, {}, false) },
            { name: element, type: `${newType}`, children: children2 }];
        }
        if (_.isObject(children2) && children1 !== undefined) {
          return [...acc, { name: element, type: `${oldType}`, children: children1 },
            { name: element, type: `${newType}`, children: iter({}, children2) }];
        }
        return children1 ? [...acc, { name: element, type: `${oldType}`, children: iter(children1, {}, false) }]
          : [...acc, { name: element, type: `${newType}`, children: iter({}, children2, false) }];
      }, []);
    };
    const total = iter(dataObject1, dataObject2, true);
    console.log(formatter(total));
    return formatter(total);
  };


export default gendiff;