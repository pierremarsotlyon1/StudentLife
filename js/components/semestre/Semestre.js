/**
 * Created by pierremarsot on 23/06/2017.
 */
import React from 'react';
import {connect} from 'react-redux';

import {Container, Content, Text, Button, Icon, Card, CardItem, Body, Badge, Left, Right, ListItem, Separator} from 'native-base';
import moment from 'moment';

import Margin from '../../styles/Margin';
import TextStyle from '../../styles/Text';

class Semestre extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    title: 'Semestre',
    headerRight: <Button
      transparent
      onPress={() => navigation.navigate("UpdateSemestre", {
        id: navigation.state.params.id,
      })}
    >
      <Icon name='settings'/>
    </Button>,
    headerLeft: <Button
      transparent
      onPress={() => navigation.goBack()}
    >
      <Icon name='ios-arrow-back'/>
      <Text>Semetres</Text>
    </Button>
  });


  constructor(props) {
    super(props);

    if (!this.props.navigation.state.params.id || this.props.navigation.state.params.id.length === 0) {
      this.props.navigation.goBack();
    }

    this.state = {
      semestre: {},
      id: this.props.navigation.state.params.id
    };
  }

  componentWillReceiveProps(nextProps) {
    this._affecteSemestre(nextProps);
  }

  componentDidMount() {
    this._affecteSemestre(this.props);
  }

  _affecteSemestre = (props) => {
    const semestre = props.semestres.find((s) => {
      return s.id === this.state.id;
    });

    if (!semestre) {
      this.props.navigation.goBack();
    }

    this.setState({
      semestre: semestre,
    });
  };

  render() {
    const {semestre} = this.state;
    let uesCard = [];

    if (semestre !== {}) {
      const {ues} = semestre;
      let keyUe = 0;

      if (ues && ues.length > 0) {
        let keyIndexNotes = 0;
        for (const ue of ues) {
          let notesBadge = [];

          if (ue.notes && ue.notes.length > 0) {
            ue.notes.sort((a, b) => {
              return moment(a.created).isSameOrBefore(b.created) ? -1 : 1;
            });

            for (const note of ue.notes) {
              notesBadge.push(
                <ListItem key={"keyBadge_" + keyIndexNotes} >
                  <Left>
                    <Text>{note.name}</Text>
                  </Left>
                  <Right>
                    <Text>{note.note} / {note.denominateur}</Text>
                  </Right>
                </ListItem>
              );

              /* notesBadge.push(
               <Badge primary key={"keyBadge_" + keyIndexNotes} style={{
               flexDirection: 'row'
               }}>
               <Text>{note.note} / {note.denominateur}</Text>
               </Badge>
               );*/
              keyIndexNotes++;
            }
          }

          if (notesBadge.length === 0) {
            continue;
          }

          uesCard.push(
            <Separator bordered key={"separator" + ue.name}>
              <Text>{ue.name}</Text>
            </Separator>
          );

          uesCard = uesCard.concat(notesBadge);
          keyUe++;
        }
      }
    }

    if (uesCard.length === 0) {
      uesCard.push(
        <Text key="empty_notes" style={Object.assign({}, Margin.m25, TextStyle.center)}>
          Vous n'avez pas encore de note dans ce semestre
        </Text>
      );
    }

    return (
      <Container>
        <Content>
          {uesCard}
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    semestres: state.semestre.semestres,
  };
}

export default connect(mapStateToProps)(Semestre);