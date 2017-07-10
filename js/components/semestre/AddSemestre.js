/**
 * Created by pierremarsot on 24/06/2017.
 */
import React from 'react';
import {connect} from 'react-redux';

import { Container, Content, Form, Item, Input, Label, Button, Text, CheckBox, Body, ListItem } from 'native-base';
import Margin from '../../styles/Margin';
import Background from '../../styles/Background';

import {addSemestre} from '../../actions/semestres';

class AddSemestre extends React.Component {
  static navigationOptions = {
    title: 'Ajouter un semestre',
  };

  constructor(props){
    super(props);

    this.state = {
      courant: false,
      nom: '',
      url: '',
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.semestres.length > this.props.semestres.length){
      this.props.navigation.goBack();
    }
  }

  handleNom = (nom) => {
    this.setState({
      nom: nom,
    });
  };

  handleUrl = (url) => {
    this.setState({
      url: url,
    });
  };

  handleCourant = () => {
    this.setState({
      courant: !this.state.courant,
    });
  };

  handleSubmit = () => {
    this.props.dispatch(addSemestre(this.state.nom, this.state.url, this.state.courant));
  };

  render(){
    const {url, nom, courant} = this.state;

    return (
      <Container style={Background.white}>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Nom</Label>
              <Input
                onChangeText={this.handleNom}
                value={nom}
              />
            </Item>
            <Item floatingLabel>
              <Label>Url</Label>
              <Input
                onChangeText={this.handleUrl}
                value={url}
              />
            </Item>
            <ListItem>
              <CheckBox
                checked={courant}
                onPress={this.handleCourant}
              />
              <Body>
              <Text>Semestre courant</Text>
              </Body>
            </ListItem>
            <Button
              block
              style={Margin.m30}
              onPress={this.handleSubmit}
            >
              <Text>Enregistrer</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state){
  return {
    semestres: state.semestre.semestres,
  };
}

export default connect(mapStateToProps)(AddSemestre);