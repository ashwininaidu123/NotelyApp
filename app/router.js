import React, { Component } from "react";
import { Scene, Router } from "react-native-router-flux";

import Home from "./screens/home";
import Edit from "./screens/edit";

export default class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene
            key="home"
            component={Home}
            initial={false}
            hideNavBar={true}
          />

          <Scene
            key="edit"
            component={Edit}
            initial={false}
            hideNavBar={true}
          />
        </Scene>
      </Router>
    );
  }
}
