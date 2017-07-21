/**
 * Created by pierremarsot on 13/07/2017.
 */
import React from 'react';
import {Platform} from 'react-native';
import {connect} from 'react-redux';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Text, Spinner} from 'native-base';
import Camera from 'react-native-camera';
import Margin from '../../styles/Margin';
import TextStyle from '../../styles/Text';

import {updateUrlIcs} from '../../actions/calendar';

class CalendarCamera extends React.Component {
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

    this.props.dispatch(updateUrlIcs("http://adelb.univ-lyon1.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?resources=15501&projectId=1&calType=ical&firstDate=2017-11-06&lastDate=2017-11-12"));
  }

  handleRead = (e) => {
    console.log(e.data);
    this.props.dispatch(updateUrlIcs(e.data));
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
          <Text style={Object.assign({}, Margin.m25, TextStyle.center)}>
            Vous n'avez pas authorisé l'utilisation de la caméra, merci de vérifier vos réglages.
          </Text>
      }
    }

    return blockCamera;
  }
}

function mapStateToProps(state){
  return {

  };
}

export default connect(mapStateToProps)(CalendarCamera);