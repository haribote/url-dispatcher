/**
 * test
 */

// import modules
import assert from 'power-assert'
import Dispatcher from '../src/dispatcher.js'

/**
 * create instance of Dispatcher
 */
let dispatcher = new Dispatcher({
  routes: {
    '/'                        : () => {
      return 'root';
    },

    '/hoge'                    : () => {
      return '/hoge';
    },

    '/hoge/:piyo'              : (piyo) => {
      return `/hoge/${piyo}`;
    },

    '/hoge/:piyo/:fuga'        : (piyo, fuga) => {
      return `/hoge/${piyo}/${fuga}`;
    },

    '/hoge?piyo=:fuga&foo=:bar': (search, fuga, bar)  => {
      return `/hoge?piyo=${fuga}&foo=${bar}`;
    },

    '/foobar/*splat'           : (path, search) => {
      return `/${path}?${search}`;
    }
  }
});

/**
 * test case
 */
describe('dispatcher', () => {
  it('root', () => {
    assert.equal(dispatcher.run('http://www.fizzbuzz.com/'), 'root');
  });
  it('/hoge', () => {
    assert.equal(dispatcher.run('http://www.fizzbuzz.com/hoge'), '/hoge');
  });
  it('/hoge/:piyo', () => {
    assert.equal(dispatcher.run('http://www.fizzbuzz.com/hoge/1'), '/hoge/1');
  });
  it('/hoge/:piyo/:fuga', () => {
    assert.equal(dispatcher.run('http://www.fizzbuzz.com/hoge/1/2'), '/hoge/1/2');
  });
  it('/hoge?piyo=:fuga&foo=:bar', () => {
    assert.equal(dispatcher.run('http://www.fizzbuzz.com/hoge?piyo=1&foo=2'), '/hoge?piyo=1&foo=2');
  });
  it('foobar/*splat', () => {
    assert.equal(dispatcher.run('http://www.fizzbuzz.com/foobar/hoge/piyo/?fuga=foo'), '/hoge/piyo/?fuga=foo');
  });
});
