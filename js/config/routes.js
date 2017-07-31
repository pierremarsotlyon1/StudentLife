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
import Jobs from '../components/jobs/Jobs';
import Calendar from '../components/calendar/Calendar';
import CalendarSettings from '../components/calendar/CalendarSettings';
import CalendarCamera from '../components/calendar/CalendarCamera';

import {StackNavigator, TabNavigator, DrawerNavigator} from "react-navigation";
import InformationUrlCalendar from '../components/calendar/InformationUrlCalendar';
import InformationUrlSemestre from '../components/semestre/InformationUrlSemestre';
import Suggestion from '../components/settings/Suggestion';
import ProblemeTechnique from '../components/settings/ProblemeTechnique';

const TabNavigatorAccount = TabNavigator({
  BonPlans: {
    screen: StackNavigator({
      BonsPlans: {
        screen: BonPlans
      }
    }, {
      initialRouteName: 'BonsPlans',
      navigationOptions: {
        tabBarIcon: () => (
          <Icon
            name="thumbs-up"
          />
        )
      }
    }),
  },
  Jobs: {
    screen: StackNavigator({
      Jobs: {
        screen: Jobs
      }
    }, {
      initialRouteName: 'Jobs',
      navigationOptions: {
        tabBarIcon: () => (
          <Icon
            name="thumbs-up"
          />
        )
      }
    }),
  },
  SemestreListTab: {
    screen: StackNavigator({
      SemestreList: {
        screen: SemestreList
      },
      AddSemestre: {
        screen: AddSemestre
      },
      Semestre: {
        screen: Semestre
      },
      UpdateSemestre: {
        screen: UpdateSemestre
      },
      InformationUrlSemestre: {
        screen: InformationUrlSemestre,
      }
    }, {
      initialRouteName: 'SemestreList',
      navigationOptions: {
        tabBarIcon: () => (
          <Icon name="clipboard"/>
        )
      }
    })
  },
  CalendarTab: {
    screen: StackNavigator({
      Calendar: {
        screen: Calendar
      },
      CalendarSettings: {
        screen: CalendarSettings,
      },
      CalendarCamera: {
        screen: CalendarCamera,
      },
      InformationUrlCalendar: {
        screen: InformationUrlCalendar,
      }
    }, {
      initialRouteName: 'Calendar',
      navigationOptions: {
        tabBarIcon: () => (
          <Icon name="calendar"/>
        ),
      }
    })
  },
  Settings: {
    screen: StackNavigator({
      Settings: {
        screen: Settings
      },
      ChangePassword: {
        screen: ChangePassword
      },
      PersonalInformations: {
        screen: PersonalInformations
      },
      ProblemeTechnique: {
        screen: ProblemeTechnique,
      },
      Suggestion: {
        screen: Suggestion,
      }
    }, {
      initialRouteName: 'Settings',
      navigationOptions: {
        tabBarIcon: () => (
          <Icon name="settings"/>
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