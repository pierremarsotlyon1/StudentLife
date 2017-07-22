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
  Separator,
  Spinner
} from 'native-base';

import {synchroniserCalendar} from '../../actions/calendar';

class CalendarSettings extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    title: 'Configuration'
  });

  constructor(props) {
    super(props);
  }

  getUrlCalendar = () => {
    this.props.navigation.navigate("CalendarCamera");
  };

  handleSynchroniserCalendar = () => {
    this.props.dispatch(synchroniserCalendar());
  };

  render() {
    const {synchronisation} = this.props;

    let rightSynchronisation;
    if (synchronisation) {
      rightSynchronisation = <Right>
        <Spinner color='blue'/>
      </Right>;
    }

    let listItemSychro;
    if (synchronisation) {
      listItemSychro = <ListItem
        icon
        button
      >
        <Left>
          <Icon name="md-sync"/>
        </Left>
        <Body>
        <Text>
          Synchroniser l'agenda
        </Text>
        </Body>
        {rightSynchronisation}
      </ListItem>;
    }
    else {
      listItemSychro = <ListItem
        icon
        button
        onPress={() => this.handleSynchroniserCalendar()}
      >
        <Left>
          <Icon name="md-sync"/>
        </Left>
        <Body>
        <Text>
          Synchroniser l'agenda
        </Text>
        </Body>
        {rightSynchronisation}
      </ListItem>;
    }

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
          {listItemSychro}
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    synchronisation: state.calendar.synchronisation,
  };
}

export default connect(mapStateToProps)(CalendarSettings);