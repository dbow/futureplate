import request from 'superagent';


const API_URL = process.env.API_URL || '/api/';

export function get(path, query) {
  const promise = new Promise((resolve, reject) => {
    request
      .get(`${API_URL}${path}`)
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

