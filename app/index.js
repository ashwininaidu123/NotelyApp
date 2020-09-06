import React, { Component } from "react";
import { View } from "react-native";

import Router from "./router";
import { Provider } from "react-redux";
import configureStore from "@lib/configureStore";

let store = configureStore();

export default class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <Router />
        </View>
      </Provider>
    );
  }
}
