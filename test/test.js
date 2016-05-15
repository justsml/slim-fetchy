'use strict';

import test from 'tape';

import {fetch} from '../index.js';

var testUrl ='https://raw.githubusercontent.com/justsml/slim-fetchy/master/package.json';


test('A passing test', (assert) => {
  fetch(dummyUrl, {method: 'GET'})
  .then(({body, headers, status, statusCode}) => {
    console.warn('body', body);
    assert.ok(body, 'Body must exist');
  })
  assert.end();
});

// test('Assertions with tape.', (assert) => {
//   const expected = 'something to test';
//   const actual = 'sonething to test';

//   assert.equal(actual, expected,
//     'Given two mismatched values, .equal() should produce a nice bug report');

//   assert.end();
// });
