'use strict';

const test = require('tape');

const {fetch} = require('../index.js');

var testUrl ='https://raw.githubusercontent.com/justsml/slim-fetchy/master/package.json';


test('Can GET URL and parse JSON', (assert) => {
  fetch(testUrl, {method: 'GET'})
  .catch(err => console.error('Failed Req', err))
  .then(({data}) => {
    // console.warn('body', results);
    assert.ok(data, 'Data must exist');
    assert.equals(data.name, 'slim-fetchy', 'parsed json response payload');
    assert.ok(data.scripts, 'has expected `scripts` node');
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
