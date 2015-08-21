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
    '/': () => {
      return 'root';
    },

    '/hoge': () => {
      return '/hoge';
    },

    '/hoge/:piyo': (piyo) => {
      return { piyo };
    },

    '/hoge/:piyo/:fuga': (piyo, fuga) => {
      return { piyo, fuga };
    },

    '/hoge?piyo=:fuga&foo=:bar': (search, fuga, bar)  => {
      return { search, fuga, bar };
    },

    '/foobar/*splat': (path, search) => {
      return { path, search };
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
    assert.deepEqual(
      dispatcher.run('http://www.fizzbuzz.com/hoge/1'),
      {
        piyo: '1'
      }
    );
  });

  it('/hoge/:piyo/:fuga', () => {
    assert.deepEqual(
      dispatcher.run('http://www.fizzbuzz.com/hoge/1/2'),
      {
        piyo: '1',
        fuga: '2'
      }
    );
  });

  it('/hoge?piyo=:fuga&foo=:bar', () => {
    assert.deepEqual(
      dispatcher.run('http://www.fizzbuzz.com/hoge?piyo=1&foo=2'),
      {
        search: 'piyo=1&foo=2',
        fuga  : '1',
        bar   : '2'
      }
    );
  });

  it('foobar/*splat', () => {
    assert.deepEqual(
      dispatcher.run('http://www.fizzbuzz.com/foobar/hoge/piyo/?fuga=foo'),
      {
        path  : 'hoge/piyo/',
        search: 'fuga=foo'
      }
    );
  });
});
