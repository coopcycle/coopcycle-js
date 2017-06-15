import "whatwg-fetch";
import cookieStorage from "./cookieStorage.js";


function client(httpBaseURL) {
  /*
    @param {string} httpBaseURL: URL for the Coopcycle API server - ex: https://coopcyle.org
    @constructor
  */

  this.httpBaseURL = httpBaseURL;
  this.storage = new cookieStorage();
}

client.prototype.createRequest = function(method, uri, data, headers) {
  /*
    @param {string} method: HTTP method
    @param {string} uri: URI to query
  */

  headers = headers || new Headers();
  headers.append("Content-Type", "application/json");

  var options = {
    method: method,
    headers: headers,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  // TO-DO : use URL-module to build URL
  return new Request(this.httpBaseURL + uri, options);
};

client.prototype.createAuthorizedRequest = function(method, uri, data) {
  /*

    Send a request with the JWT set.

    @param {string} method: HTTP method
    @param {string} uri: URI to query
  */

  var headers = new Headers(),
      token = this.storage.get('token') || '';
  headers.append("Authorization", "Bearer " + token);
  headers.append("Content-Type", "application/json");

  return createRequest(method, uri, data, headers);
};

client.prototype.request = function(method, uri, data) {
  console.log(method + ' ' + uri);
  var req = this.model ? this.createAuthorizedRequest(method, uri, data) : this.createRequest(method, uri, data);
  return this.fetch(req, { credentials: 'include' });
};

client.prototype.get = function(uri, data) {
  return this.request('GET', uri, data);
};

client.prototype.post = function(uri, data) {
  return this.request('POST', uri, data);
};

client.prototype.put = function(uri, data) {
  return this.request('PUT', uri, data);
};

client.prototype.fetch = function(req) {
  /*

  Send a request to the server. If the token is not valid anymore, try to refresh it.

  @param {object} req: request object
  */

  return new Promise((resolve, reject) => {
    fetch(req)
      .then((response) => {
        if (response.ok) {
          return response.json().then((data) => resolve(data));
        }
        else {
          response.json().then(function (data) {
            if (response.status === 401 && data.message === 'Bad credentials' && this.storage.get('refreshToken')) {
              console.log('Request is not authorized, refreshing token...');
              return refreshToken(this.httpBaseURL, this.storage.get('refreshToken'))
                .then((credentials) => {
                  console.log('Storing new credentials...');
                  this.storage.set('token', credentials.token);
                  this.storage.set('refreshToken', credentials.refresh_token);

                  req.headers.set('Authorization', 'Bearer ' + this.storage.get('token'));
                  return this.fetch(req);
                })
                .catch((err) => {
                  console.log('Refresh token is not valid ' + this.storage.get('refreshToken'));
                  throw 'Invalid refresh token';
                });
            }
            else {
              throw 'Error (' + response.status + ') ' + JSON.stringify(data.message);
            }
          });
        }
      });
  });
};

client.prototype.login = function(username, password) {
  /*

    Log the user in, and store the credentials.

    @param {string} username: username
    @param {string} password: password
  */

  return doLogin(this.httpBaseURL, username, password)
    .then((credentials) => {

      this.storage.set('token', credentials.token);
      this.storage.set('refreshToken', credentials.refresh_token);

      return true;
    })
    .catch((err) => {
      throw err;
    });
};

var doLogin = function(baseURL, username, password) {

  var formData  = new FormData();
  formData.append("_username", username);
  formData.append("_password", password);
  var request = new Request(baseURL + '/api/login_check', {
    method: 'POST',
    body: formData
  });

  return new Promise((resolve, reject) => {
    fetch(request)
      .then(function(res) {
        if (res.ok) {
          return res.json().then((json) => resolve(json));
        }

        return res.json().then((json) => reject(json.message));
      })
      .catch((err) => {
        reject(err);
      });
  });
};

var refreshToken = function(baseURL, refreshToken) {
  var formData  = new FormData();
  formData.append("refresh_token", refreshToken);
  var request = new Request(baseURL + '/api/token/refresh', {
    method: 'POST',
    body: formData
  });

  return new Promise((resolve, reject) => {
    fetch(request)
      .then(function(response) {
        if (response.ok) {
          return response.json().then((credentials) => resolve(credentials));
        }

        return response.json().then((json) => reject(json.message));
      });
  });
};

export default client;
