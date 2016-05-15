
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

import isoFetch from 'isomorphic-fetch';

export function fetch(url, {method = 'GET', headers = {}, contentType = 'json', session = true, body, data}) {
  body =  body || data; // fallback for data param
  if (method === 'GET' && typeof body === 'object') {
    method = 'POST';//override default, assume post - not get
  }
  let defaultHeaders = {
    'Accept':       'application/json,text/html,application/xhtml+xml,application/xml,text/plain',
    'Content-Type': contentType === 'json' ? 'application/json' :
                    contentType === 'text' ? 'text/plain' : 'application/xhtml+xml'
  };
  let payload = {
    'credentials':  session ? 'include' : null,
    'method':       method,
    'headers':      Object.assign(defaultHeaders, headers),
  };
  if (/PUT|POST/i.test(method)) {
    payload.body = JSON.stringify(body);
  } else {
    // TODO: Transform body into a querystring on non-POST/PUT reqs
  }
  return isoFetch(url, payload)
    .then(checkStatus)
    .then(parseJSON); //TODO: Handle non-JSON better
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return Promise
  .resolve(response.text())
  .then(data => {
    console.warn('data #1: ', data);
    data = ['{', '['].indexOf(data.trim()) >= 0 ? JSON.parse(data) : data;
    console.warn('data #2: ', data);
    return {
      'status':     response.status,
      'statusText': response.statusText,
      'data':       data,
      'body':       data,
      'headers':    response.headers
    }
  })
}
