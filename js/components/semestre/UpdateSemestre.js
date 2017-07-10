/**
 * Created by pierremarsot on 24/06/2017.
 */
import React from 'react';
import {connect} from 'react-redux';

import { Container, Content, Form, Item, Input, Label, Button, Text, CheckBox, Body, ListItem } from 'native-base';
import Margin from '../../styles/Margin';
import Background from '../../styles/Background';

import {updateSemestre, removeSemestre} from '../../actions/semestres';

class UpdateSemestre extends React.Component {
  static navigationOptions = {
    title: 'Modifier un semestre',
  };

  constructor(props){
    super(props);

    if(!this.props.navigation.state.params.id || this.props.navigation.state.params.id.length === 0){
      this.props.navigation.goBack();
    }

    const semestre = this.props.semestres.find((s) => {
      return s.id === this.props.navigation.state.params.id;
    });

    if(!semestre){
      this.props.navigation.goBack();
    }

    this.state = {
      courant: semestre.actif,
      nom: semestre.name,
      url: semestre.url,
      id: semestre.id,
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.semestres !== this.props.semestres){
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
    this.props.dispatch(updateSemestre(this.state.id, this.state.nom, this.state.url, this.state.courant));
  };

  remove = () => {
    const {id} = this.state;

    this.props.dispatch(removeSemestre(id));
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
              <Text>Modifier</Text>
            </Button>
          </Form>
          <Button
            block
            danger
            onPress={() => this.remove()}
          >
            <Text>Supprimer</Text>
          </Button>
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

export default connect(mapStateToProps)(UpdateSemestre);