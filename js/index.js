import React, { Component } from "react";
import { Text } from "react-native";
import { Provider, connect } from "react-redux";
import { StackNavigator, TabNavigator, addNavigationHelpers } from "react-navigation";
import AppWithNavigationState from './containers/App';
import Routes from "./config/routes";
import getStore from "./store";

const AppNavigator = Routes;

const navReducer = (state, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
};

const store = getStore(navReducer);

export default function NCAP() {
    return (
        <Provider store={store}>
            <AppWithNavigationState/>
        </Provider>
    );
}
