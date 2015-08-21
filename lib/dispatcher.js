/**!
 * url-dispatcher
 * Author : KIMURA Tetsuro,
 * License: MIT
 * Thanks : Backbone.js
 */

// import modules
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _lodashIsregexp = require('lodash.isregexp');

var _lodashIsregexp2 = _interopRequireDefault(_lodashIsregexp);

var _lodashIsfunction = require('lodash.isfunction');

var _lodashIsfunction2 = _interopRequireDefault(_lodashIsfunction);

/**
 * Constants of Regular expression patterns
 * @type {RegExp}
 */
var ESCAPE_REG_EXP = /[\-{}\[\]+?.,\\\^$|#\s]/g;
var OPTIONAL_PARAM = /\((.*?)\)/g;
var NAMED_PARAM = /(\(\?)?:\w+/g;
var SPLAT_PARAM = /\*\w+/g;

/**
 * URL Dispatcher
 * @class
 * @param {Object} routes
 * @param {Function} routes.*
 */

var Dispatcher = (function () {
  /**
   * @param {Object} options
   * @param {Object} options.routes
   * @param {Function} options.routes.*
   */

  function Dispatcher() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Dispatcher);

    this.routes = options.routes;
    this.handlers = [];

    Dispatcher._bindRoutes.call(this);
  }

  /**
   * Add routing handler to collection
   * @param route
   * @param callback
   */

  _createClass(Dispatcher, [{
    key: 'route',
    value: function route(_route, callback) {
      if (!(0, _lodashIsregexp2['default'])(_route)) {
        _route = Dispatcher._routeToRegExp(_route);
      }

      this.handlers.unshift({ route: _route, callback: callback });
    }

    /**
     * Matching and execute callback
     * @param {String} urlString
     */
  }, {
    key: 'run',
    value: function run(urlString) {
      var method = undefined;
      var args = [];
      var parsedUrl = _url2['default'].parse(urlString);

      this.handlers.forEach(function (handler, i) {
        var match = handler.route.exec((parsedUrl.pathname || '') + (parsedUrl.search || ''));

        if (match) {
          method = handler.callback;
          args = args.concat(match.slice(1));
        }
      });

      if ((0, _lodashIsfunction2['default'])(method)) {
        return method.apply(null, args);
      }
    }

    /**
     * Bind all routing map
     * @private
     */
  }], [{
    key: '_bindRoutes',
    value: function _bindRoutes() {
      var _this = this;

      if (this.routes === undefined) {
        return;
      }

      Object.keys(this.routes).reverse().forEach(function (key) {
        _this.route(key, _this.routes[key]);
      });
    }

    /**
     * Return matching pattern
     * @param route
     * @returns {RegExp}
     * @private
     */
  }, {
    key: '_routeToRegExp',
    value: function _routeToRegExp(route) {
      route = route.replace(ESCAPE_REG_EXP, '\\$&').replace(OPTIONAL_PARAM, '(?:$1)?').replace(NAMED_PARAM, function (match, optional) {
        return optional ? match : '([^/?]+)';
      }).replace(SPLAT_PARAM, '([^?]*?)');

      return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
    }
  }]);

  return Dispatcher;
})();

exports['default'] = Dispatcher;
module.exports = exports['default'];
