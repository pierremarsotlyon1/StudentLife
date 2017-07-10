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
import CustomIcon from '../components/CustomIcon';

import {StackNavigator, TabNavigator, DrawerNavigator} from "react-navigation";

const TabNavigatorAccount = TabNavigator({
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
          <CustomIcon icon='md-clipboard'/>
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
          <CustomIcon icon='md-settings'/>
        ),
      }
    })
  }
}, {
  tabBarOptions: {
    showLabel: false,
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
