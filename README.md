# url-dispatcher
A URL dispatcher.
It was inspired by Backbone.Router.

## Get started
```bash
npm install url-dispatcher --save
```

## Usage
```javascript
// import the module
var Dispatcher = require('url-dispatcher');

// create instance with the routing map like Backbone.Router
var dispatcher = new Dispatcher({
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

// Call run method with URL String 
dispatcher.run(location.href);
/* 
 * ex.) location.href = 'http://www.foobar.com/hoge/1/2'
 *      => '/hoge/1/2'
 */
```

## Thanks
[Backbone.js](https://github.com/jashkenas/backbone)
