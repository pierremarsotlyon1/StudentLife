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
import TextStyle from '../../styles/Text';
import Margin from '../../styles/Margin';

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
      <Icon name='settings'/>
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
    this.setState({
      selected: day.dateString,
    });
  };

  render() {
    let eventsShow = [];
    let markedDates = {};
    let eventsToSort = [];
    let haveSelectedMarkedDate = false;

    //On parcourt tous les events
    for(let i = 0; i < this.props.events.length; i++){
      //On recup l'event
      const event = this.props.events[i];

      //On format la date
      const dateDebutFormat = moment(event.date_debut).format('YYYY-MM-DD');

      //On regarde si on est sur la date que l'utilisateur a selectionné
      //Si c'est le cas, on ajoute l'event au tableau des events à afficher
      if(this.state.selected === dateDebutFormat) {
        eventsToSort.push(event);
      }

      //On regarde si on doit marquer la date dans le calendrier
      if(!markedDates[dateDebutFormat]){
        if(dateDebutFormat === this.state.selected){
          markedDates[dateDebutFormat] = {marked: true, selected: true};
          haveSelectedMarkedDate = true;
        }
        else{
          markedDates[dateDebutFormat] = {marked: true};
        }
      }
    }

    //On regarde si on a selectionné un jour, si ce n'est pas le cas, c'est qu'on a aucun event pour cette date
    if(!haveSelectedMarkedDate){
      markedDates[this.state.selected] = {marked: false, selected: true};
    }

    if(eventsToSort.length > 0){
      //On sort les events en fonction de la date de début
      eventsToSort.sort((a, b) => {
        if(!a.date_debut || !b.date_debut){
          return 1;
        }

        return moment(a.date_debut).isAfter(moment(b.date_debut)) ? 1 : -1;
      });

      //On crée le tableau du dom
      for(let i = 0; i < eventsToSort.length; i++){
        const event = eventsToSort[i];

        let description, location;

        if(event.description){
          description = <Text>{event.description}</Text>;
        }

        if(event.location){
          location = <Text>{event.location}</Text>;
        }

        eventsShow.push(
          <Card key={i}>
            <CardItem header>
              <Text>{event.titre}</Text>
            </CardItem>
            <CardItem>
              <Body>
              {description}
              {location}
              </Body>
            </CardItem>
          </Card>
        );
      }
    }

    if(eventsShow.length === 0){
      eventsShow.push(
        <View key="empty_events">
          <Text style={Object.assign({}, TextStyle.center, Margin.mt15)}>
            Aucune information à cette date
          </Text>
        </View>
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
  }
});

function mapStateToProps(state) {
  return {
    events: state.calendar.events,
  };
}

export default connect(mapStateToProps)(CalendarCours);