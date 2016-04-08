import request from 'superagent';


export function get(path, query) {
  const API_URL = process.env.API_URL || '/api/';
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

export function post(path, data) {
  const API_URL = process.env.API_URL || '/api/';
  const promise = new Promise((resolve, reject) => {
    request
      .post(`${API_URL}${path}`)
      .send(data)
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

export function put(path, data) {
  const API_URL = process.env.API_URL || '/api/';
  const promise = new Promise((resolve, reject) => {
    request
      .put(`${API_URL}${path}`)
      .send(data)
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

export function del(path) {
  const API_URL = process.env.API_URL || '/api/';
  const promise = new Promise((resolve, reject) => {
    request
      .delete(`${API_URL}${path}`)
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

