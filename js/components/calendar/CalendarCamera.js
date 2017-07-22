/**
 * Created by pierremarsot on 13/07/2017.
 */
import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Text, Spinner, Button} from 'native-base';
import Camera from 'react-native-camera';
import Margin from '../../styles/Margin';
import TextStyle from '../../styles/Text';

import {updateUrlIcs} from '../../actions/calendar';

class CalendarCamera extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    title: 'URL Agenda'
  });

  constructor(props) {
    super(props);

    this.state = {
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
    this.props.dispatch(updateUrlIcs(e.data));
    this.props.navigation.goBack();
  };

  handleClickGetUrl = () => {
    this.props.navigation.navigate("InformationUrlCalendar");
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
          bottomContent={
            <Button
              transparent
              full
              onPress={() => this.handleClickGetUrl()}
            >
              <Text
                style={Object.assign({}, Margin.m25, TextStyle.center)}
              >
                Comment récupérer l'url ?
              </Text>
            </Button>
          }
        />;
      }
      else {
        blockCamera =
          <Text style={Object.assign({}, Margin.m25, TextStyle.center)}>
            Vous n'avez pas authorisé l'utilisation de la caméra, merci de vérifier vos réglages.
          </Text>
      }
    }

    return blockCamera;
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },

  textBold: {
    fontWeight: '500',
    color: '#000',
  },

  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },

  buttonTouchable: {
    padding: 16,
  },
});

export default connect()(CalendarCamera);