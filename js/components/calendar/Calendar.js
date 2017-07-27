/**
 * Created by pierremarsot on 13/07/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import {
  Container, Content, Spinner, Grid, Row, Col, Icon,
  Card,
  CardItem,
  Body,
  Badge,
  Header,
  Left,
  Title,
  Right,
  Button,
} from 'native-base';
import {Agenda, Calendar} from 'react-native-calendars';
import {View, StyleSheet, Text} from 'react-native';
import moment from 'moment';
import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.']
};

LocaleConfig.defaultLocale = 'fr';

import {loadEvents} from '../../actions/calendar';

class CalendarCours extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    title: 'Agenda',
    headerRight: <Button
      transparent
      onPress={() => navigation.navigate("CalendarSettings")}
    >
      <Icon name='md-settings'/>
    </Button>
  });

  constructor(props) {
    super(props);
    this.state = {
      items: {},
      selected: moment().format('YYYY-MM-DD'),
    };
  }

  componentDidMount() {
    this.props.dispatch(loadEvents());
  }

  onDayPress = (day) => {
    console.log(day.dateString);
    this.setState({
      selected: day.dateString,
    });
  };

  render() {
    let eventsShow = [];
    let markedDates = {};
    let eventsToSort = [];
    for(let i = 0; i < this.props.events.length; i++){
      const event = this.props.events[i];
      const dateDebutFormat = moment(event.date_debut).format('YYYY-MM-DD');
      if(this.state.selected === dateDebutFormat) {
        eventsToSort.push(event);
      }

      if(!markedDates[dateDebutFormat]){
        if(dateDebutFormat === this.state.selected){
          markedDates[dateDebutFormat] = {marked: true, selected: true};
        }
        else{
          markedDates[dateDebutFormat] = {marked: true};
        }
      }
    }

    if(eventsToSort.length > 0){
      eventsToSort.sort((a, b) => {
        return moment(a.date_debut).isAfter(moment(b.date_debut)) ? 1 : -1;
      });

      for(let i = 0; i < eventsToSort.length; i++){
        const event = eventsToSort[i];
        eventsShow.push(
          <Card key={i}>
            <CardItem header>
              <Text>{event.titre}</Text>
            </CardItem>
            <CardItem>
              <Body>
              <Text>{event.description}</Text>
              </Body>
            </CardItem>
          </Card>
        );
      }
    }

    if(eventsShow.length === 0){
      eventsShow.push(
        <View key="empty_events" style={styles.emptyDate}><Text>Aucune information à cette date</Text></View>
      );
    }

    return (
      <Container>
        <Content>
          <Grid>
            <Row>
              <Col>
                <Calendar
                  // Initially visible month. Default = Date()
                  current={this.state.selected}
                  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                  minDate={'2012-05-10'}
                  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                  maxDate={'2030-05-30'}
                  // Handler which gets executed on day press. Default = undefined
                  onDayPress={this.onDayPress}
                  // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                  monthFormat={'MM-yyyy'}
                  // Handler which gets executed when visible month changes in calendar. Default = undefined
                  onMonthChange={(month) => {
                    console.log('month changed', month)
                  }}
                  // Hide month navigation arrows. Default = false
                  hideArrows={false}
                  // Do not show days of other months in month page. Default = false
                  hideExtraDays={true}
                  // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out
                  // day from another month that is visible in calendar page. Default = false
                  disableMonthChange={true}
                  // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                  firstDay={1}
                  markedDates={markedDates}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                {eventsShow}
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});

function mapStateToProps(state) {
  return {
    events: state.calendar.events,
  };
}

export default connect(mapStateToProps)(CalendarCours);