import {
  AsyncStorage,
} from 'react-native';

export const ID_TOKEN = 'id_token_tomuss_student_user';

export function getToken() {
  return new Promise((resolve, reject) => {
    try {
      AsyncStorage.getItem(ID_TOKEN, (err, result) => {
        if (err) {
          return reject(undefined);
        }
        return resolve(result);
      });
    }
    catch (e) {
      return reject(undefined);
    }
  });
}

export function setLocalStorage(key, value) {

  return new Promise((resolve, reject) => {
    try {

      AsyncStorage.getItem(key, (err, result) => {
        if (!err && !result) {
          AsyncStorage.setItem(key, value, (err) => {
            if (err) {
              return reject();
            }

            return resolve();
          });
        }
        else if (!err && result) {
          AsyncStorage.setItem(key, value, (err) => {
            if (err) {
              return reject();
            }

            return resolve();
          });
        }
        else {
          return reject();
        }
      });
    }
    catch (e) {
      return reject(undefined);
    }
  });
}

export function deleteLocalStorage(key) {
  return new Promise((resolve, reject) => {
    try {

      AsyncStorage.removeItem(key)
        .then((err) => {
          if (err) {
            return reject();
          }

          return resolve();
        })
        .catch(() => {
          return reject();
        });
    }
    catch (e) {
      return reject();
    }
  });
}

export function clearLocalStorage() {
  try {
    localStorage.clear();
    console.log('clear');
    return true;
  }
  catch (e) {
    console.log(e);
    return false;
  }
}

export function getLocalStorage(key) {
  return new Promise((resolve, reject) => {
    try {
      AsyncStorage.getItem(key, (err, result) => {
        if (err) {
          return reject(undefined);
        }
        return resolve(result);
      });
    }
    catch (e) {
      return reject(undefined);
    }
  });
}