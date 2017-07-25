/**
 * Created by pierremarsot on 27/06/2017.
 */
import React from 'react';
import {connect} from 'react-redux';

import {Container, Content, Form, Item, Input, Label, Button, Text} from 'native-base';

import Margin from '../../styles/Margin';

import {changePassword} from '../../actions/auth';

class ChangePassword extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    title: 'Mot de passe'
  });
  constructor(props) {
    super(props);

    this.state = {
      newPassword: '',
      confirmNewPassword: '',
    };
  }

  componentWillReceiveProps(nextProps){
    if(this.props.lastChangePassword !== nextProps.lastChangePassword){
      this.props.navigation.goBack();
    }
  }

  handleNewPassword = (newPassword) => {
    this.setState({
      newPassword: newPassword,
    });
  };

  handleConfirmNewPassword = (confirmNewPassword) => {
    this.setState({
      confirmNewPassword: confirmNewPassword,
    });
  };

  handleSubmit = () => {
    this.props.dispatch(changePassword(this.state.newPassword, this.state.confirmNewPassword));
  };

  render() {
    const {newPassword, confirmNewPassword} = this.state;

    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Nouveau mot de passe</Label>
              <Input
                onChangeText={this.handleNewPassword}
                value={newPassword}
                secureTextEntry={true}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Confirmer le nouveau mot de passe</Label>
              <Input
                onChangeText={this.handleConfirmNewPassword}
                value={confirmNewPassword}
                secureTextEntry={true}
              />
            </Item>
            <Button
              block
              style={Margin.m30}
              onPress={this.handleSubmit}
            >
              <Text>Changer mon mot de passe</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state){
  return {
    lastChangePassword: state.auth.lastChangePassword,
  };
}

export default connect(mapStateToProps)(ChangePassword);