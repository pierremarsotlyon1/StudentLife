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
  Separator,
  Form, Item, Input, Label
} from 'native-base';

import {changeInformations, loadPersonnalInformations} from '../../actions/etudiant';

import Margin from '../../styles/Margin';

class PersonalInformations extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    title: 'Mes informations'
  });

  constructor(props){
    super(props);

    this.state = {
      nom: this.props.nom,
      prenom: this.props.prenom,
    };
  }

  componentDidMount(){
    this.props.dispatch(loadPersonnalInformations());
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      nom: nextProps.nom,
      prenom: nextProps.prenom,
    });
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

  handleSubmit = () => {
    this.props.dispatch(changeInformations(this.state.nom, this.state.prenom));
    this.props.navigation.goBack();
  };

  render() {
    const {nom, prenom} = this.state;
    const {loadingPersonalInformations} = this.props;

    return (
      <Container>
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
              <Label>Prénom</Label>
              <Input
                onChangeText={this.handlePrenom}
                value={prenom}
              />
            </Item>

            <Button
              block
              style={Margin.m30}
              onPress={this.handleSubmit}
            >
              <Text>Modifier mes informations</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    nom: state.etudiant.nom,
    prenom: state.etudiant.prenom,
    loadingPersonalInformations: state.etudiant.loadingPersonalInformations,
  };
}

export default connect(mapStateToProps)(PersonalInformations);