/**
 * splitURL
 * @param {String} url
 */

// export module
export default (url) => {
  let method;
  let path;
  let match = /^([A-Z]+)(?:\s+|$)/.exec(url);

  if (match) {
    method = match[1];
    path   = /^[A-Z]+\s+(.*)$/.exec(url);
    url    = path ? path[1]: '';
  }

  return {url, method};
}
