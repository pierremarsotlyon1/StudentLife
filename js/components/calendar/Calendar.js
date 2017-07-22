/**
 * Created by pierremarsot on 13/07/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import {Container, Content, Button, Icon} from 'native-base';
import { Agenda } from 'react-native-calendars';
import {View, StyleSheet, Text} from 'react-native';
import moment from 'moment';
import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.']
};

LocaleConfig.defaultLocale = 'fr';

import {loadEvents} from '../../actions/calendar';

class Calendar extends React.Component {
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
      selected: new Date(),
    };
  }

  componentDidMount(){
    this.props.dispatch(loadEvents());
  }

  loadItems = () => {
    setTimeout(() => {
      const {events} = this.props;

      const eventsLocal = {};
      for(const event of events){
        const startDate = moment(event.date_debut).format('YYYY-MM-DD');
        if(!eventsLocal[startDate]){
          eventsLocal[startDate] = [];
        }

        eventsLocal[startDate].push({
          titre: event.titre,
          description: event.description,
          date_debut: moment(event.date_debut).format('YYYY-MM-DD HH:mm'),
          date_fin: moment(event.date_fin).format('YYYY-MM-DD HH:mm'),
          height: Math.max(100, Math.floor(Math.random() * 150))
        });
      }

      this.setState({
        items: eventsLocal,
      }, () => {
        const newItems = {};
        Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
        this.setState({
          items: newItems
        });
      });
    }, 1000);
  };

  renderItem = (item) => {
    return (
      <View style={[styles.item]}>
        <Text>{item.titre}</Text>
        <Text>{item.description}</Text>
        <Text>{item.date_debut}</Text>
        <Text>{item.date_fin}</Text>
      </View>
    );
  };

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}><Text>Aucune information à cette date</Text></View>
    );
  };

  rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems}
        selected={this.state.selected}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        rowHasChanged={this.rowHasChanged}
        dayLoading={false}
      />
    );
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
    flex:1,
    paddingTop: 30
  }
});

function mapStateToProps(state){
  return {
    events: state.calendar.events,
  };
}

export default connect(mapStateToProps)(Calendar);