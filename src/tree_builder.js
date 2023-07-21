import _ from 'lodash';

const iter = (dataObject1, dataObject2) => {
  const keys1 = dataObject1 ? Object.keys(dataObject1) : [];
  const keys2 = dataObject2 ? Object.keys(dataObject2) : [];
  const sortedKeys = _.sortBy(_.union(keys1, keys2));
  const getDiff = (key) => {
    if (!_.has(dataObject1, key)) {
      return { key, type: 'added', value: dataObject2[key] };
    }

    if (!_.has(dataObject2, key)) {
      return { key, type: 'deleted', value: dataObject1[key] };
    }

    if (dataObject1[key] === dataObject2[key]) {
      return { key, type: 'unchanged', value: dataObject1[key] };
    }

    if (_.isObject(dataObject1[key]) && _.isObject(dataObject2[key])) {
      return { key, type: 'complex', value: iter(dataObject1[key], dataObject2[key]) };
    }

    return { key, type: 'updated', value: { oldValue: dataObject1[key], newValue: dataObject2[key] } };
  };

  const diffItems = sortedKeys.flatMap(getDiff);
  return diffItems;
};

export default iter;
