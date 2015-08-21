# url-dispatcher
A URL dispatcher.
It was inspired by Backbone.Router.

## Installation

### npm
```bash
npm install url-dispatcher --save
```
```javascript
// import the module
var Dispatcher = require('url-dispatcher');
```

### Bower
```bash
bower install url-dispatcher --save
```
```html
<script src="/path/to/script/dispatcher.min.js"></script>
<!-- Or, if you want use on IE8 -->
<script src="/path/to/script/dispatcher.compat.min.js"></script>
```

### Manually
```bash
git clone git@github.com:haribote/url-dispatcher.git
```
Or, [Download ZIP](https://github.com/haribote/url-dispatcher/archive/master.zip)
And then, copy `dest/dispatcher.min.js` to your project.
```html
<script src="/path/to/script/dispatcher.min.js"></script>
<!-- Or, if you want use on IE8 -->
<script src="/path/to/script/dispatcher.compat.min.js"></script>
```


## Usage
```javascript
// create instance with the routing map like Backbone.Router
var dispatcher = new Dispatcher({
  routes: {
    '/': function () {
      return 'root';
    },

    '/hoge': function () {
      return '/hoge';
    },

    '/hoge/:piyo': function (piyo) {
      return {
        piyo: piyo
      };
    },

    '/hoge/:piyo/:fuga': function (piyo, fuga) {
      return {
        piyo: piyo,
        fuga: fuga
      };
    },

    '/hoge?piyo=:fuga&foo=:bar': (search, fuga, bar)  => {
      return {
        search: search,
        fuga  : fuga,
        bar   : bar
      };
    },

    '/foobar/*splat': function (path, search) {
      return {
        path  : path,
        search: search
      };
    }
  }
});

// Call run method with URL String 
dispatcher.run(location.href);
/* 
 * ex.) location.href = 'http://www.foobar.com/hoge/1/2'
 *      =>  {
 *            piyo: 1,
 *            fuga: 2
 *          }
 */
```

## Thanks
[Backbone.js](https://github.com/jashkenas/backbone)
