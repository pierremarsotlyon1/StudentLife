/**
 * Created by pierremarsot on 03/07/2017.
 */
import React from 'react';
import {addNavigationHelpers} from "react-navigation";
import {connect} from 'react-redux';
import {Platform} from 'react-native';
import FCM, {
  FCMEvent,
  RemoteNotificationResult,
  WillPresentNotificationResult,
  NotificationType
} from 'react-native-fcm';

import {setFcmToken} from '../actions/auth';

import Routes from "../config/routes";
const AppNavigator = Routes;

class AppWithNavigationState extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (this.props.token !== nextProps.token && nextProps.token.length > 0) {
      FCM.getFCMToken().then(token => {
        this.setToken(token);
      });
    }
  }

  componentDidMount() {
    FCM.requestPermissions(); // for iOS
    FCM.getFCMToken().then(token => {
      if (this.props.token.length > 0) {
        this.setToken(token);
      }
    });
    this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
      // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
      if (notif.local_notification) {
        //this is a local notification
      }
      if (notif.opened_from_tray) {
        //app is open/resumed because user clicked banner
      }

      if (Platform.OS === 'ios') {
        //optional
        //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
        //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
        //notif._notificationType is available for iOS platfrom
        switch (notif._notificationType) {
          case NotificationType.Remote:
            notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
            break;
          case NotificationType.NotificationResponse:
            notif.finish();
            break;
          case NotificationType.WillPresent:
            notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
            break;
        }
      }
    });

    /* FCM.presentLocalNotification({
     id: "UNIQ_ID_STRING",                               // (optional for instant notification)
     title: "My Notification Title",                     // as FCM payload
     body: "My Notification Messagefffff",                    // as FCM payload (required)
     sound: "default",                                   // as FCM payload
     priority: "high",                                   // as FCM payload
     click_action: "ACTION",                             // as FCM payload
     badge: 10,                                          // as FCM payload IOS only, set 0 to clear badges
     number: 10,                                         // Android only
     ticker: "My Notification Ticker",                   // Android only
     auto_cancel: true,                                  // Android only (default true)
     large_icon: "ic_launcher",                           // Android only
     icon: "ic_launcher",                                // as FCM payload, you can relace this with custom icon you put in mipmap
     big_text: "Show when notification is expanded",     // Android only
     sub_text: "This is a subText",                      // Android only
     color: "red",                                       // Android only
     vibrate: 300,                                       // Android only default: 300, no vibration if you pass null
     tag: 'some_tag',                                    // Android only
     group: "group",                                     // Android only
     picture: "https://google.png",                      // Android only bigPicture style
     my_custom_data:'my_custom_field_value',             // extra data you want to throw
     lights: true,                                       // Android only, LED blinking (default false)
     show_in_foreground: false                                  // notification when app is in foreground (local & remote)
     });*/
  }

  componentWillUnmount() {
    // stop listening for events
    this.notificationListener.remove();
  }

  setToken = (fcmToken) => {
    setFcmToken(fcmToken);
  };

  render() {
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav
        })}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav,
  token: state.auth.token,
});

export default connect(mapStateToProps)(AppWithNavigationState)