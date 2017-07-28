/**
 * Created by pierremarsot on 23/06/2017.
 */
import React from 'react';
import { connect } from "react-redux";
import {Button, Text, Container, Content, Form, Item, Input, Label} from 'native-base';

import Styles from '../../styles/DrawerNavigator';
import Margin from '../../styles/Margin';
import TextStyles from '../../styles/Text';

import {register} from '../../actions/auth';

class Register extends React.Component {
  constructor(props){
    super(props);

    if(this.props.token && this.props.token.length > 0) {
      this.props.navigation.navigate("SemestreListTab");
    }

    this.state = {
      nom: '',
      prenom: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  componentWillReceiveProps(nextProps){
    if((!this.props.token || this.props.token.length === 0) && nextProps.token.length > 0){
      this.props.navigation.navigate("SemestreListTab");
    }
  }

  handleNom = (nom) => {
    this.setState({
      nom: nom,
    });
  };

  handlePrenom = (prenom) => {
    this.setState({
      prenom: prenom,
    });
  };

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

  handleConfirmPassword = (confirmPassword) => {
    this.setState({
      confirmPassword: confirmPassword,
    });
  };

  handleSubmit = () => {
    this.props.dispatch(
      register(
        this.state.nom,
        this.state.prenom,
        this.state.email,
        this.state.password,
        this.state.confirmPassword,
      )
    );
  };

  redirectLogin = () => {
    this.props.navigation.navigate("Login");
  };

  render() {
    const {nom, prenom, email, password, confirmPassword } = this.state;

    return (
      <Container style={Styles.body}>
        <Content>
          <Text style={Object.assign({}, TextStyles.h1, TextStyles.center, TextStyles.weight500)}>S'inscrire</Text>
          <Form>
            <Item floatingLabel>
              <Label>Nom</Label>
              <Input
                onChangeText={this.handleNom}
                value={nom}
              />
            </Item>
            <Item floatingLabel>
              <Label>Prénom</Label>
              <Input
                onChangeText={this.handlePrenom}
                value={prenom}
              />
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                onChangeText={this.handleEmail}
                keyboardType="email-address"
                value={email}
              />
            </Item>
            <Item floatingLabel >
              <Label>Mot de passe</Label>
              <Input
                onChangeText={this.handlePassword}
                value={password}
                secureTextEntry={true}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Confirmation du mot de passe</Label>
              <Input
                onChangeText={this.handleConfirmPassword}
                value={confirmPassword}
                secureTextEntry={true}
              />
            </Item>
            <Button
              block
              style={Margin.m30}
              onPress={this.handleSubmit}
            >
              <Text>Créer son compte</Text>
            </Button>
            <Button
              transparent
              full
              onPress={this.redirectLogin}
            >
              <Text
                style={TextStyles.center}
              >
                Déjà un compte ? Connecte-toi !
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

export default connect(mapStateToProps)(Register);