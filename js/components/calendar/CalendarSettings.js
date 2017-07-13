/**
 * Created by pierremarsot on 13/07/2017.
 */
import React from 'react';
import {Linking, Platform} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Text, Spinner} from 'native-base';
import Camera from 'react-native-camera';
import Margin from '../../styles/Margin';
import TextStyle from '../../styles/Text';

class CalendarSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      loading: true,
      access: true,
    };
  }

  componentDidMount() {
    if (Platform.OS === "ios") {
      Camera.checkVideoAuthorizationStatus()
        .then((access) => {
          this.setState({
            loading: false,
            access: access,
          });
        })
        .catch(() => {
          this.setState({
            loading: false,
            access: false,
          });
        });
    }
    else {
      this.setState({
        loading: false,
        access: true,
      });
    }
  }

  handleRead = (e) => {
    /*ical.fromURL(e.data, {}, function(err, data) {
     for (var k in data){
     if (data.hasOwnProperty(k)) {
     var ev = data[k]
     console.log("Conference",
     ev.summary,
     'is in',
     ev.location,
     'on the', ev.start.getDate(), 'of', months[ev.start.getMonth()]);
     }
     }
     });*/
  };

  render() {
    const {loading, access} = this.state;

    let blockCamera;
    if (loading) {
      blockCamera = <Spinner color='blue'/>;
    }
    else {
      if (access) {
        blockCamera = <QRCodeScanner
          onRead={this.handleRead}
          bottomContent={<Text>{this.state.message}</Text>}
        />;
      }
      else {
        blockCamera =
          <Text style={Object.assign({}, Margin.m25, TextStyle.center)}>Vous n'avez pas authorisé l'utilisation de la
            caméra, merci de vérifier vos réglages.</Text>
      }
    }

    return blockCamera;
  }
}

export default CalendarSettings;