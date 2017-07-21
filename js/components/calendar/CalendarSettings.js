/**
 * Created by pierremarsot on 13/07/2017.
 */
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
  Separator
} from 'native-base';

import {refreshEvents, loadEvents} from '../../actions/calendar';

class CalendarSettings extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    title: 'Configuration'
  });

  constructor(props) {
    super(props);
  }

  refreshCalendar = () => {
    this.props.dispatch(refreshEvents());
  };

  getUrlCalendar = () => {
    this.props.navigation.navigate("CalendarCamera");
  };

  downloadCalendar = () => {
    this.props.dispatch(loadEvents());
  };

  render() {
    return (
      <Container>
        <Content>
          <Separator bordered>
            <Text>Mon calendrier</Text>
          </Separator>
          <ListItem
            icon
            button
            onPress={() => this.getUrlCalendar()}
          >
            <Left>
              <Icon name="md-key"/>
            </Left>
            <Body>
            <Text>Récupérer l'URL</Text>
            </Body>
            <Right/>
          </ListItem>
          <ListItem
            icon
            button
            onPress={() => this.refreshCalendar()}
          >
            <Left>
              <Icon name="md-cloud-upload"/>
            </Left>
            <Body>
            <Text>
              Mettre à jour sur le serveur
            </Text>
            <Text note>
              A faire en cas de changement d'emploi du temps
            </Text>
            </Body>
            <Right/>
          </ListItem>
          <ListItem
            icon
            button
            onPress={() => this.downloadCalendar()}
          >
            <Left>
              <Icon name="md-cloud-download"/>
            </Left>
            <Body>
            <Text>
              Mettre à jour sur le téléphone
            </Text>
            <Text note>
              Pour récupérer votre agenda à partir du serveur
            </Text>
            </Body>
            <Right/>
          </ListItem>
        </Content>
      </Container>
    )
  }
}

export default connect()(CalendarSettings);