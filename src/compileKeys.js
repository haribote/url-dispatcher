/**
 * compileKeys
 * @param {Object} urls
 */

export default (urls) => {
  return urls.map((url) => {
    let pattern = url[0].replace(/\/:\w+/g, '(?:/([^\/]+))');
    url[0] = new RegExp(pattern);
    return url;
  });
}
