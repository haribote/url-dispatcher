/**!
 * url-dispatcher
 * Author: KIMURA Tetsuro,
 * License: MIT
 */

// import modules
import flattenKeys from './flattenKeys.js'
import compileKeys from './compileKeys.js'

/**
 * URL Dispatcher
 * @class
 */
class Dispatcher {
  /**
   * @param {Object} options
   * @param {Object} options.routes
   * @param {Function} options.routes.*
   */
  constructor (options = {
    routes : {}
  }) {
    this.compiled = compileKeys(flattenKeys(options.routes));
  }

  /**
   * @param {String} pathname
   */
  run (pathname) {
    let method;
    let args = [];

    this.compiled.forEach((x) => {
      let match = x[0].exec(pathname);

      if (match) {
        if (!x[1]) {
          method = x[2];
          args = args.concat(match.slice(1));
        }
      }
    });

    if (typeof method === 'function') {
      return method.apply(null, args);
    }
  }
}

export default Dispatcher
