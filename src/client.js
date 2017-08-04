import localforage from 'localforage'

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

var doRegister = function(baseURL, email, username, password) {

  var formData  = new FormData();
  formData.append("_email", email);
  formData.append("_username", username);
  formData.append("_password", password);
  var request = new Request(baseURL + '/api/register', {
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

class Client {


  constructor(httpBaseURL, credentials) {
    /*
      @param {string} httpBaseURL: URL for the Coopcycle API server - ex: https://coopcyle.org
      @constructor
    */

    this.httpBaseURL = httpBaseURL;
    this.credentials = credentials;
  }

  createRequest(method, uri, data, headers) {
    /*
      @param {string} method: HTTP method
      @param {string} uri: URI to query
    */

    headers = headers || new Headers();
    headers.set("Content-Type", "application/json");

    var options = {
      method: method,
      headers: headers,
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    // TO-DO : use URL-module to build URL
    return new Request(this.httpBaseURL + uri, options);
  }

  createAuthorizedRequest(method, uri, data) {
    /*

      Send a request with the JWT set.

      @param {string} method: HTTP method
      @param {string} uri: URI to query
    */

    const headers = new Headers();
    let token = this.credentials['token'];

    headers.append("Authorization", "Bearer " + token);

    return this.createRequest(method, uri, data, headers);
  }

  hasCredentials() {
    return this.credentials && this.credentials.hasOwnProperty('token');
  }

  request(method, uri, data) {
    console.log(method + ' ' + uri);
    var req = this.hasCredentials() ? this.createAuthorizedRequest(method, uri, data) : this.createRequest(method, uri, data);
    return this.fetch(req, { credentials: 'include' });
  };

  get(uri, data) {
    return this.request('GET', uri, data);
  };

  post(uri, data) {
    return this.request('POST', uri, data);
  };

  put(uri, data) {
    return this.request('PUT', uri, data);
  };

  fetch(req) {
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
              switch (response.status) {

                case 401:
                  if (data.message === 'Bad credentials' && this.credentials['refresh_token']) {
                    console.log('Request is not authorized, refreshing token...');
                    return refreshToken(this.httpBaseURL, this.credentials['refresh_token'])
                      .then((credentials) => {
                        console.log('Storing new credentials...');
                        // FIXME This is async
                        localforage.setItem('coopcyle__api_credentials', credentials);

                        req.headers.set('Authorization', 'Bearer ' + credentials.token);
                        return this.fetch(req);
                      })
                      .catch((err) => {
                        console.log('Refresh token is not valid ' + credentials['refresh_token']);
                        throw 'Invalid refresh token';
                      });
                  }
                  break;

                default:
                  reject(data);
              }
            });
          }
        });
    });
  }

  login(username, password) {
    /*

      Log the user in, and store the credentials.

      @param {string} username: username
      @param {string} password: password
    */

    return doLogin(this.httpBaseURL, username, password)
      .then((credentials) => {

        this.credentials = credentials;

        // FIXME This is async
        localforage.setItem('coopcyle__api_credentials', credentials);

        return credentials;
      })
      .catch((err) => {
        throw err;
      });
  }

  register(email, username, password) {
    return doRegister(this.httpBaseURL, email, username, password)
      .then((credentials) => {

        this.credentials = credentials;

        // FIXME This is async
        localforage.setItem('coopcyle__api_credentials', credentials);

        return credentials;
      })
      .catch((err) => {
        throw err;
      });
  }

}

export default Client;
