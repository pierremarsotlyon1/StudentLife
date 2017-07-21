/**
 * Created by pierremarsot on 23/06/2017.
 */
import {getLocalStorage, ID_TOKEN} from './localStorage';

const urlServer = process.env.NODE_ENV === 'production' ? 'https://valeriemoroseau.com' : 'https://valeriemoroseau.com';//'http://localhost:1330';

export function get(url, query = {}) {

  return new Promise((resolve, reject) => {
    let obj = {
      method: 'GET',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/json'
      },
    };

    getLocalStorage(ID_TOKEN)
      .then((token) => {
        if (token) {
          obj.headers.Authorization = 'Bearer ' + token;
        }

        if (query) {
          let urlTemp = "";
          for (const key in query) {
            if (urlTemp.length === 0) {
              urlTemp += "?" + key + "=" + query[key];
            }
            else {
              urlTemp += "&" + key + "=" + query[key];
            }
          }

          url += urlTemp;
        }

        fetch(urlServer + url, obj)
          .then((response) => {
            if (!response || !response.ok) {
              return reject(response);
            }
            return resolve(response);
          })
          .catch((response) => {
            return reject(response);
          });
      })
      .catch(() => {
        if (query) {
          let urlTemp = "";
          for (const key in query) {
            if (urlTemp.length === 0) {
              urlTemp += "?" + key + "=" + query[key];
            }
            else {
              urlTemp += "&" + key + "=" + query[key];
            }
          }

          url += urlTemp;
        }

        fetch(urlServer + url, obj)
          .then((response) => {
            if (!response || !response.ok) {
              return reject(response);
            }
            return resolve(response);
          })
          .catch((response) => {
            return reject(response);
          });
      });
  });
}

export function put(url, query = {}) {
  return new Promise((resolve, reject) => {
    let obj = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    };

    getLocalStorage(ID_TOKEN)
      .then((token) => {
        if (token) {
          obj.headers.Authorization = 'Bearer ' + token;
        }

        fetch(urlServer + url, obj)
          .then((response) => {
            if (!response || !response.ok) {
              return reject(response);
            }

            return resolve(response);
          })
          .catch((response) => {
            return reject(response);
          });
      })
      .catch(() => {
        fetch(urlServer + url, obj)
          .then((response) => {
            if (!response || !response.ok) {
              return reject(response);
            }
            return resolve(response);
          })
          .catch((response) => {
            return reject(response);
          });
      });
  });
}

export function post(url, query = {}) {
  return new Promise((resolve, reject) => {

    let obj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    };

    getLocalStorage(ID_TOKEN)
      .then((token) => {
        if (token) {
          obj.headers.Authorization = 'Bearer ' + token;
        }

        fetch(urlServer + url, obj)
          .then((response) => {
            if (!response || !response.ok) {
              return reject(response);
            }
            return resolve(response);
          })
          .catch((response) => {
            return reject(response);
          });
      })
      .catch(() => {
        fetch(urlServer + url, obj)
          .then((response) => {
            if (!response || !response.ok) {
              return reject(response);
            }
            return resolve(response);
          })
          .catch((response) => {
            return reject(response);
          });
      });
  });
}

export function remove(url, query = {}) {
  return new Promise((resolve, reject) => {
    let obj = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    };

    getLocalStorage(ID_TOKEN)
      .then((token) => {
        if (token) {
          obj.headers.Authorization = 'Bearer ' + token;
        }

        fetch(urlServer + url, obj)
          .then((response) => {
            if (!response || !response.ok) {
              return reject(response);
            }
            return resolve(response);
          })
          .catch((response) => {
            return reject(response);
          });
      })
      .catch(() => {
        fetch(urlServer + url, obj)
          .then((response) => {
            if (!response || !response.ok) {
              return reject(response);
            }
            return resolve(response);
          })
          .catch((response) => {
            return reject(response);
          });
      });
  });
}