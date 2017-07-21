/**
 * Created by pierremarsot on 23/06/2017.
 */
import React from 'react';
import {connect} from "react-redux";
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Button,
  List,
  ListItem,
  Icon,
  Right,
  Left,
  View
} from 'native-base';

import {loadSemestres} from '../../actions/semestres';

import Background from '../../styles/Background';
import moment from 'moment';

class SemestreList extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    title: 'Semestres',
    headerRight: <Button
      transparent
      onPress={() => navigation.navigate("AddSemestre")}
    >
      <Icon name='md-add'/>
    </Button>
  });

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch(loadSemestres());
  }

  redirectSemestre = (id) => {
    this.props.navigation.navigate("Semestre", {
      id: id,
    });
  };

  render() {
    const {semestres} = this.props;

    let semestresLocales = [];

    semestres.sort((a, b) => {
      return moment(a.created).isSameOrBefore(b.created) ? 1 : -1;
    });

    for (const semestre of semestres) {
      let left;
      if (semestre.actif) {
        left =
          <Icon name="md-checkmark-circle-outline"/>;
      }
      semestresLocales.push(
        <ListItem
          key={semestre.url}
          button
          onPress={() => this.redirectSemestre(semestre.id)}
        >
          <Left>
            {left}
            <Text>{semestre.name}</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward"/>
          </Right>
        </ListItem>
      )
    }

    if (semestresLocales.length === 0) {
      semestresLocales.push(
        <Text key="no_semestres">Vous n'avez encore enregistré aucun semestre</Text>
      )
    }

    return (
      <Container style={Background.white}>
        <Content>
          <List>
            {semestresLocales}
          </List>
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    semestres: state.semestre.semestres,
    token: state.auth.token,
  };
}

export default connect(mapStateToProps)(SemestreList);