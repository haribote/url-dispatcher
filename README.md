# url-dispacher
A URL dispatcher like Backbone.Router.

## Get started
```bash
npm install url-dispatcher --save
```

## Usage
```javascript
var Dispatcher = require('url-dispatcher');

var dispatcher = Dispatcher({
  routes: {
    '/'                        : function () {
      return 'root';
    },

    '/hoge'                    : function () {
      return '/hoge';
    },

    '/hoge/:piyo'              : function (piyo) {
      return '/hoge/' + piyo + '';
    },

    '/hoge/:piyo/:fuga'        : function (piyo, fuga) {
      return '/hoge/' + piyo + '/' + fuga;
    },

    '/hoge?piyo=:fuga&foo=:bar': (search, fuga, bar)  => {
      return '/hoge?piyo=' + fuga + '&foo=' + bar;
    },

    '/foobar/*splat'           : function (path, search) {
      return '/' + path + '?' + search;
    }
  }
});

dispatcher.run(location.href);
// ex.) location.href = 'http://www.foobar.com/hoge/1/2'
//      => '/hoge/1/2'
```
