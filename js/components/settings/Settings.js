/**
 * Created by pierremarsot on 27/06/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import {
  Container,
  Content,
  Text,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  List,
  ListItem,
  Separator
} from 'native-base';

import {logout, isConnected} from '../../actions/auth';

class Settings extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    title: 'Settings'
  });

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    isConnected()
      .then((connected) => {
        if (!connected) {
          this.props.navigation.navigate("Login");
        }
      });
  }

  componentWillReceiveProps(nextProps) {
    isConnected()
      .then((connected) => {
        if (!connected) {
          this.props.navigation.navigate("Login");
        }
      });
  }

  handleLogout = () => {
    this.props.dispatch(logout());
  };

  handleChangePassword = () => {
    this.props.navigation.navigate("ChangePassword");
  };

  handlePersonalInformations = () => {
    this.props.navigation.navigate("PersonalInformations");
  };

  render() {
    return (
      <Container>
        <Content>
          <Separator bordered>
            <Text>Mon compte</Text>
          </Separator>
          <ListItem
            icon
            button
            onPress={() => this.handlePersonalInformations()}
          >
            <Left>
              <Icon name="md-information-circle"/>
            </Left>
            <Body>
            <Text>Mes informations</Text>
            </Body>
            <Right/>
          </ListItem>
          <ListItem
            icon
            button
            onPress={() => this.handleChangePassword()}
          >
            <Left>
              <Icon name="md-key"/>
            </Left>
            <Body>
            <Text>Changer mon mot de passe</Text>
            </Body>
            <Right/>
          </ListItem>
          <ListItem
            icon
            button
            onPress={() => this.handleLogout()}
          >
            <Left>
              <Icon name="md-log-out"/>
            </Left>
            <Body>
            <Text>Déconnexion</Text>
            </Body>
            <Right/>
          </ListItem>
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    token: state.auth.token,
  };
}

export default connect(mapStateToProps)(Settings);