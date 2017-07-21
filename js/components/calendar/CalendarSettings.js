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
              <Icon name="md-log-out"/>
            </Left>
            <Body>
            <Text>Mettre à jour mon calendrier</Text>
            </Body>
            <Right/>
          </ListItem>
          <ListItem
            icon
            button
            onPress={() => this.downloadCalendar()}
          >
            <Left>
              <Icon name="md-log-out"/>
            </Left>
            <Body>
            <Text>Télécharger mon calendrier</Text>
            </Body>
            <Right/>
          </ListItem>
        </Content>
      </Container>
    )
  }
}

export default connect()(CalendarSettings);