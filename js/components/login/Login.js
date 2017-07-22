/**
 * Created by pierremarsot on 23/06/2017.
 */
import React from 'react';
import {connect} from "react-redux";
import {Button, Text, Container, Content, Form, Item, Input, Label} from 'native-base';

import Styles from '../../styles/DrawerNavigator';
import Margin from '../../styles/Margin';
import TextStyles from '../../styles/Text';

import {login, setToken} from '../../actions/auth';
import {setLastSynchro} from '../../actions/calendar';

class Login extends React.Component {
  constructor(props) {
    super(props);

    if(this.props.token && this.props.token.length > 0) {
      this.props.navigation.navigate("SemestreListTab");
    }

    this.props.dispatch(setToken());

    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount(){
    this.props.dispatch(setLastSynchro());
  }

  componentWillReceiveProps(nextProps){
    if((!this.props.token || this.props.token.length === 0) && nextProps.token.length > 0){
      this.props.navigation.navigate("SemestreListTab");
    }
  }

  handleEmail = (email) => {
    this.setState({
      email: email,
    });
  };

  handlePassword = (password) => {
    this.setState({
      password: password,
    });
  };

  handleSubmit = () => {
    this.props.dispatch(login(this.state.email, this.state.password));
  };

  redirectRegister = () => {
    this.props.navigation.navigate('Register')
  };

  render() {
    const {password, email} = this.state;

    return (
      <Container style={Styles.body}>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                onChangeText={this.handleEmail}
                keyboardType="email-address"
                value={email}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Mot de passe</Label>
              <Input
                onChangeText={this.handlePassword}
                value={password}
                secureTextEntry={true}
              />
            </Item>
            <Button
              block
              style={Margin.m30}
              onPress={this.handleSubmit}
            >
              <Text>Se connecter</Text>
            </Button>
            <Button
              transparent
              onPress={() => this.redirectRegister()}
            >
              <Text
                style={TextStyles.center}
              >
                Pas de compte ? Inscris-toi !
              </Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state){
  return {
    token: state.auth.token,
  }
}

export default connect(mapStateToProps)(Login);