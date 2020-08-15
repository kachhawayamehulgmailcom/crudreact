
export const getIndexOfArrayData = (data, property, value) => {
  let result = -1;
  data.some(function(item, i) {
    if (item[property] === value) {
      result = i;
      return true;
    }
    return '';
  });
  return result;
};