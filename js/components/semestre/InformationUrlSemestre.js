/**
 * Created by pierremarsot on 22/07/2017.
 */
import React from 'react';
import {Container, Content, Text} from 'native-base';
import Margin from '../../styles/Margin';
import TextStyle from '../../styles/Text';

class InformationUrlSemestre extends React.Component {
  static navigationOptions = {
    title: 'Url du semestre',
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Content>
          <Text
            style={Object.assign({}, Margin.m15, TextStyle.center)}
          >
            Etape 1 - Connectez-vous sur Tomuss.
          </Text>
          <Text
            style={Object.assign({}, Margin.m15, TextStyle.center)}
          >
            Etape 2 - Rendez-vous dans la section "Liens et autres informations" à droite de la page et cliquez sur
            "Flux RSS".
          </Text>
          <Text
            style={Object.assign({}, Margin.m15, TextStyle.center)}
          >
            Etape 3 - L'url demandée dans la page précédente est l'url de votre flux RSS que vous trouverez dans la
            barre d'adresse de votre navigateur
          </Text>
          <Text
            style={Object.assign({}, Margin.m15, TextStyle.center)}
          >
            Si vous êtes sur mobile et que vous ne pouvez pas ouvrir le flux RSS, il vous suffit de copier l'url
            en maintenant appuyé sur l'écriture "Flux RSS"
          </Text>
        </Content>
      </Container>
    )
  }
}

export default InformationUrlSemestre;