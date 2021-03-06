
/**
 * Fetch API wrapper
 *
 * @author Dan Levy <Dan@DanLevy.net>
 *
 * @description
 * Polyfilled Fetch API using session/cookies & json defaults.
 *
 * @credit
 *  https://github.com/matthew-andrews/isomorphic-fetch
 *  https://github.com/github/fetch
 *
 */

// import promiseEs6 from 'es6-promise'
// promiseEs6.polyfill();

const isoFetch = require('isomorphic-fetch');

exports.fetch = function fetch(url, {method = 'GET', headers = {}, contentType = 'json', session = true, body, data} = {}) {
  body =  body || data; // fallback for data param
  if (method === 'GET' && typeof body === 'object') {
    method = 'POST';//override default, assume post - not get
  }
  const defaultHeaders = {
    'Accept':       'application/json,text/html,application/xhtml+xml,application/xml,text/plain',
    'Content-Type': contentType === 'json' ? 'application/json' :
                    contentType === 'text' ? 'text/plain' : 'application/xhtml+xml'
  };
  const payload = {
    'credentials':  session ? 'include' : null,
    'method':       method,
    'headers':      Object.assign(defaultHeaders, headers),
  };
  if (/PUT|POST/i.test(method)) {
    payload.body = JSON.stringify(body);
  } else {
    // TODO: Transform body into a querystring on non-POST/PUT reqs
  }

  function checkStatus(response) {
    if (!response) { return Promise.reject(new Error('Invalid or null response data.')); }
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText)
      error.response = response
      return Promise.reject(error)
    }
  }

  function parseJSON(response) {
    return Promise
    .resolve(response.text())
    .then(data => {
      try {
        let _tmp = JSON.parse(data);
        data = _tmp;
      } catch(ex) {
        console.error('Slim-Fetchy: parseJSON Failed', ex, response);
        return Promise.reject(new Error('Failed to parse JSON.'));
      }
      return {
        'status':     response.status,
        'statusText': response.statusText,
        'data':       data,
        'body':       data,
        'headers':    response.headers
      }
    })
  }

  return isoFetch(url, payload)
    .then(checkStatus)
    .then(parseJSON); // TODO: Handle non-JSON better
}
