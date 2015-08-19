/**
 * test
 */

// import modules
import assert from 'power-assert'
import flattenKeys from '../src/flattenKeys.js'
import compileKeys from '../src/compileKeys.js'
import Dispatcher from '../src/dispatcher.js'

// cache
let routes = {
  '/': () => {
    return 'root';
  },
  '/hoge': () => {
    return 'hoge';
  },
  '/piyo/:id': (id) => {
    return `piyo:${id}`;
  },
  '/fuga?key=:key': (key)  => {
    return `fuga:key:${key}`;
  }
};
let flatten  = flattenKeys(routes);
let compiled = compileKeys(flatten);
let dispatcher = new Dispatcher({
  routes
});

// test1
describe('flattenKeys', () => {
  it('sample', () => {
    assert.equal(flatten.length, 4);
  });
});

// test2
describe('compileKeys', () => {
  it('sample', () => {
    assert.equal(compiled.length, 4);
  });
});

// test3
describe('dispatcher', () => {
  it('root', () => {
    assert.equal(dispatcher.run('/'), 'root');
  });
  it('hoge', () => {
    assert.equal(dispatcher.run('/hoge'), 'hoge');
  });
  it('piyo/:id', () => {
    assert.equal(dispatcher.run('/piyo/1'), 'piyo:1');
  });
  //it('fuga?key=:key', () => {
  //  assert.equal(dispatcher.run('/fuga?key=a'), 'fuga:key:a');
  //});
});
