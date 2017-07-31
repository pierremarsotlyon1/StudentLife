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
    title: 'Paramètres'
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

  handleProblemeTechnique = () => {
    this.props.navigation.navigate("ProblemeTechnique");
  };

  handleSuggestion = () => {
    this.props.navigation.navigate("Suggestion");
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
              <Icon name="information-circle"/>
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
              <Icon name="key"/>
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
              <Icon name="log-out"/>
            </Left>
            <Body>
            <Text>Déconnexion</Text>
            </Body>
            <Right/>
          </ListItem>
          <Separator bordered>
            <Text>L'application</Text>
          </Separator>
          <ListItem
            icon
            button
            onPress={() => this.handleProblemeTechnique()}
          >
            <Left>
              <Icon name="hammer"/>
            </Left>
            <Body>
            <Text>Problème technique</Text>
            </Body>
            <Right/>
          </ListItem>
          <ListItem
            icon
            button
            onPress={() => this.handleSuggestion()}
          >
            <Left>
              <Icon name="chatboxes"/>
            </Left>
            <Body>
            <Text>Une suggestion ?</Text>
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