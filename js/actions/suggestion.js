/**
 * Created by pierremarsot on 22/07/2017.
 */
import {post} from '../tools/Api';
import Toast from 'react-native-simple-toast';

export function addSuggestion(message) {
  return new Promise((resolve, reject) => {
    if (!message || message.length === 0) {
      Toast.show('Vous devez saisir un message');
      return reject();
    }

    post('/api/suggestion', {
      _source: {
        message: message,
      }
    })
      .then(() => {
        Toast.show('Votre suggestion a bien été enregistrée');
        return resolve();
      })
      .catch((response) => {
        if (response) {
          response.json()
            .then((response) => {
              if (response.error) {
                Toast.show(response.error);
              }

              return reject();
            })
            .catch(() => {
              return reject();
            });
        } else {
          return reject();
        }
      });
  });
}