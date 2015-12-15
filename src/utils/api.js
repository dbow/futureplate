import request from 'superagent';


let _baseUrl = '/api/';

export function setBaseUrl(baseUrl) {
  _baseUrl = baseUrl;
}

export function get(path, query) {
  const promise = new Promise((resolve, reject) => {
    request
      .get(`${_baseUrl}${path}`)
      .query(query)
      .end((error, response) => {
        if (error) {
          reject(error, response && response.body);
        } else {
          resolve(response.body);
        }
      });
  });
  return promise;
}

