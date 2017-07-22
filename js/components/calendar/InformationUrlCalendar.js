/**
 * Created by pierremarsot on 22/07/2017.
 */
import React from 'react';
import {Image, StyleSheet} from 'react-native'
import {Container, Content, Text} from 'native-base';
import Margin from '../../styles/Margin';
import TextStyle from '../../styles/Text';

class InformationUrlCalendar extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    title: 'Information'
  });

  render() {
    const iconeExport = require('./img/iconeExport.png');

    return (
      <Container>
        <Content>
          <Text
            style={Object.assign({}, Margin.m15, TextStyle.center)}
          >
            Etape 1 - Afficher ton emploi du temps sur ADE (via Tomuss)
          </Text>
          <Text
            style={Object.assign({}, Margin.m15, TextStyle.center)}
          >
            Etape 2 - Exporter l'agenda en cliquant sur cette icône :
          </Text>
          <Text
            style={TextStyle.center}
          >
            <Image
              source={iconeExport}
            />
          </Text>
          <Text
            style={Object.assign({}, Margin.m15, TextStyle.center)}
          >
            Etape 3 - Saisir les dates de début et de fin de votre semestre/année
          </Text>
          <Text
            style={Object.assign({}, Margin.m15, TextStyle.center)}
          >
            Etape 4 - Laisser le format Icalendar puis cliquer sur "générer l'url"
          </Text>
          <Text
            style={Object.assign({}, Margin.m15, TextStyle.center)}
          >
            Etape 5 - Vous pouvez maintenant scanner le QR Code grâce à la page précédente
          </Text>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default InformationUrlCalendar;