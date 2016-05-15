# slim-fetchy

Enhanced `fetch` API.

https://github.com/justsml/slim-fetchy.git

* :ballot_box_with_check: Simple HTTP request
* :ballot_box_with_check: Small
* :ballot_box_with_check: Encode POST Body
* :ballot_box_with_check: Response parser
* :ballot_box_with_check: Smarter error handling

## Why?

I was listening to Slim Shady EP.
And all the other names were taken.

## Install

```sh
# Add to your project:
npm install slim-fetchy --save

# Optionally, clone Code:
git clone https://github.com/justsml/slim-fetchy.git
cd slim-fetchy
npm install
npm test
```

## Seriously, Why?

The current [`fetch` API spec](https://fetch.spec.whatwg.org/)
and the [implementation from Github](https://github.github.io/fetch/) are ill-suited for the majority of use-cases.

Specifically, JSON-backed services require repetitive encoding and response parsing.
Additionally, acquiring HTTP response *body content* requires 2 promise `.then()` calls.
*(Some Promise libraries, like [bluebird](https://github.com/petkaantonov/bluebird) will automatically handle this for you.)*

I decided to create a wrapper to eliminate frequent hurdles &amp; repetitive code.

#### slim-fetchy JSON optimized usage:
```js
// Using slim-fetchy (optional: es6 destructuring)
fetch('/users.json')
  .then(({body}) => {
    document.body.innerHTML = body; // SINGLE `.then` - has access to headers, status & statusText
  })
```

#### Compared to current fetch API/spec:

```js
// Using github's implementation
fetch('/users.json')
  .then(function(response) {
    return response.text()
  }).then(function(body) {
    document.body.innerHTML = body
  })
```

## Stats & Support Info

* Requires `Promise` support - native or polyfilled. Tested with [Bluebird](https://www.npmjs.com/package/bluebird) and [es6-promise](https://www.npmjs.com/package/es6-promise)
* Runs on: **Browser &amp; NodeJS**
* Gzipped: 2.8K


