/**!
 * url-dispatcher
 * Author: KIMURA Tetsuro,
 * License: MIT
 */

// import modules
import url         from 'url'
import isRegExp    from 'lodash.isregexp'
import isFunction  from 'lodash.isfunction'

// constants
const ESCAPE_REG_EXP = /[\-{}\[\]+?.,\\\^$|#\s]/g;
const OPTIONAL_PARAM = /\((.*?)\)/g;
const NAMED_PARAM    = /(\(\?)?:\w+/g;
const SPLAT_PARAM    = /\*\w+/g;

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
  constructor (options = {}) {
    this.routes   = options.routes;
    this.handlers = [];

    Dispatcher._bindRoutes.call(this);
  }

  route (route, callback) {
    if (!isRegExp(route)) {
      route = Dispatcher._routeToRegExp(route);
    }

    this.handlers.unshift({ route, callback});
  }

  /**
   * @param {String} urlString
   */
  run (urlString) {
    let method;
    let args = [];
    let parsedUrl = url.parse(urlString);

    this.handlers.forEach((handler, i) => {
      let match = handler.route.exec((parsedUrl.pathname || '') + (parsedUrl.search || ''));

      if (match) {
        method = handler.callback;
        args = args.concat(match.slice(1));
      }
    });

    if (isFunction(method)) {
      return method.apply(null, args);
    }
  }

  static _bindRoutes () {
    if (this.routes === undefined) {
      return;
    }

    Object
      .keys(this.routes)
      .reverse()
      .forEach((key) => {
        this.route(key, this.routes[key]);
      });
  }

  static _routeToRegExp (route) {
    route = route
      .replace(ESCAPE_REG_EXP, '\\$&')
      .replace(OPTIONAL_PARAM, '(?:$1)?')
      .replace(NAMED_PARAM, (match, optional) => {
        return optional ? match : '([^/?]+)';
      })
      .replace(SPLAT_PARAM, '([^?]*?)');

    return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
  }
}

export default Dispatcher
