'use strict';

const test = require('tape');

const {fetch} = require('../index.js');

var testUrl ='https://raw.githubusercontent.com/justsml/slim-fetchy/master/package.json';


test('A passing test', (assert) => {
  fetch(testUrl, {method: 'GET'})
  .catch(err => console.error('Failed Req', err))
  .then((results) => {
    console.warn('body', results);
    assert.ok(results, 'Body must exist');
    assert.ok(results.data, 'Data must exist');
    assert.end();
  })
});

// test('Assertions with tape.', (assert) => {
//   const expected = 'something to test';
//   const actual = 'sonething to test';

//   assert.equal(actual, expected,
//     'Given two mismatched values, .equal() should produce a nice bug report');

//   assert.end();
// });
