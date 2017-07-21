import React from 'react';
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import SemestreList from '../components/semestre/SemestreList';
import AddSemestre from '../components/semestre/AddSemestre';
import UpdateSemestre from '../components/semestre/UpdateSemestre';
import Semestre from '../components/semestre/Semestre';
import Settings from '../components/settings/Settings';
import ChangePassword from '../components/settings/ChangePassword';
import PersonalInformations from '../components/settings/PersonalInformations';
import {Icon} from 'native-base';
import BonPlans from '../components/bonplans/BonPlans';
import Calendar from '../components/calendar/Calendar';
import CalendarSettings from '../components/calendar/CalendarSettings';
import CalendarCamera from '../components/calendar/CalendarCamera';

import {StackNavigator, TabNavigator, DrawerNavigator} from "react-navigation";

const TabNavigatorAccount = TabNavigator({
  BonPlans: {
    screen: BonPlans,
  },
  SemestreListTab: {
    screen: StackNavigator({
      SemestreList: {screen: SemestreList},
      AddSemestre: {screen: AddSemestre},
      Semestre: {screen: Semestre},
      UpdateSemestre: {screen: UpdateSemestre},
    }, {
      initialRouteName: 'SemestreList',
      navigationOptions : {
        tabBarIcon: () => (
          <Icon name="md-clipboard" />
        )
      }
    })
  },
  CalendarTab: {
    screen: StackNavigator({
      Calendar: {screen: Calendar},
      CalendarSettings: {
        screen: CalendarSettings,
      },
      CalendarCamera: {
        screen: CalendarCamera,
      }
    }, {
      initialRouteName: 'Calendar',
      navigationOptions : {
        tabBarIcon: () => (
          <Icon name="md-calendar" />
        ),
      }
    })
  },
  Settings: {
    screen: StackNavigator({
      Settings: {screen: Settings},
      ChangePassword: {screen: ChangePassword},
      PersonalInformations: {screen: PersonalInformations},
    }, {
      initialRouteName: 'Settings',
      navigationOptions : {
        tabBarIcon: () => (
          <Icon name="md-settings" />
        ),
      }
    })
  }
}, {
  tabBarOptions: {
    showLabel: false,
    showIcon: true,
  },
});


const Navi = DrawerNavigator({
  Login: {screen: Login},
  Register: {screen: Register},
  Account: {
    screen: TabNavigatorAccount,
  }
});

export default Navi;

/*
 StackNavigator(Routes.SemestresTab, {
 navigationOptions: {
 title: ({ state }) => {
 if (state.params) {
 return `${state.params.title}`;
 }
 }
 }
 })
 */
