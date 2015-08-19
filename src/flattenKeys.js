/**
 * flattenKeys
 * @param {Object} obj
 * @param {Array} [memo]
 * @param {String} [prefix]
 * @param {Function} [prev_method]
 * @return {Array}
 */

// import modules
import splitURL from './splitURL.js'

// define fanction
let flattenKeys = (obj, memo = [], prefix = '', prev_method = null) => {
  Object.keys(obj).forEach((k) => {
    let split = splitURL(k);

    if (typeof obj[k] === 'function') {
      memo.push([prefix + split.url, split.method || prev_method, obj[k]]);
    } else {
      flattenKeys(obj[k], memo, prefix + split.url, split.method);
    }
  });

  return memo;
};

// export module
export default flattenKeys
