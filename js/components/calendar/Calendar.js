/**
 * Created by pierremarsot on 13/07/2017.
 */
import React from 'react';
import {Container, Content, Text, Button, Icon} from 'native-base';
import { Agenda } from 'react-native-calendars';
import {View, StyleSheet} from 'react-native';

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
      items: {}
    };
  }

  loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
  };

  renderItem = (item) => {
    return (
      <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
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

  timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems}
        selected={'2017-07-12'}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        rowHasChanged={this.rowHasChanged}
        dayLoading={true}
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

export default Calendar;