/**
 * Created by pierremarsot on 13/07/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import CountdownCircle from 'react-native-countdown-circle'
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
import moment from 'moment';

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
    const {synchronisation, dateLastSynchro} = this.props;

    //on calcul le nombre de seconde de diff entre maintenant et la dernière synchro
    let countDownCircle;
    if(dateLastSynchro){
      const duration = moment.duration(moment().diff(moment(dateLastSynchro)));
      const seconds = duration.asSeconds();
      let diffSeconds = (5 * 60) - seconds;
      if(diffSeconds > 0) {
        diffSeconds = Number.parseInt(diffSeconds);
        countDownCircle = <CountdownCircle
          seconds={diffSeconds}
          radius={20}
          borderWidth={2}
          color="#ff003f"
          textStyle={{ fontSize: 20 }}
          onTimeElapsed={() => this.forceUpdate()}
        />
      }
    }

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
    else if(countDownCircle) {
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
        <Right>
          {countDownCircle}
        </Right>
      </ListItem>;
    }
    else{
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
              <Icon name="md-link"/>
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
    dateLastSynchro: state.calendar.dateLastSynchro,
  };
}

export default connect(mapStateToProps)(CalendarSettings);