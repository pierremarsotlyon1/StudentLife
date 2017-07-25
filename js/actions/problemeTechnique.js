/**
 * Created by pierremarsot on 22/07/2017.
 */
import {post} from '../tools/Api';
import Toast from 'react-native-simple-toast';

export function addProblemeTechnique(message) {
  return new Promise((resolve, reject) => {
    if (!message || message.length === 0) {
      Toast.show('Vous devez saisir un message');
      return reject();
    }

    post('/api/probleme/technique', {
      _source: {
        message: message,
      }
    })
      .then(() => {
        Toast.show('Votre problème technique a bien été enregistré');
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
        }else{
          return reject();
        }
      });
  });
}