import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "@action/";
import { Actions } from "react-native-router-flux";
import { Icon } from "native-base";


export class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHeart: false,
      isStar: false
    };
  }

  onFilter = () => {
    this.props.filterData(this.props.data.data, this.state);
    this.props.closeDrawer();
  };
  onCloseFilter = () => {
    this.props.closeDrawer();
  }
  render() {
    let { closeDrawer } = this.props;
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <View style={{ backgroundColor: "transparent", height: 500 }}>
          <TouchableOpacity  onPress={() => this.onCloseFilter()}
          style={styles.icon}>
            <Text style={styles.item}>
              FILTER
            </Text>
            <Icon
              style={{ color: "#B3B6B7", marginLeft: 10 }}
              type="Entypo"
              name="cross"
              />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => this.setState({ isHeart: !this.state.isHeart })} >
            <Text
              style={[
                styles.item,
                { color: this.state.isHeart ? "#00D9B7" : "#fff" }
              ]}>
              Hearted
            </Text>
            <Icon
              style={{ color: this.state.isHeart ? "#00D9B7" : "#B3B6B7", fontWeight: 300}}
              type="Entypo"
              name="check"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => this.setState({ isStar: !this.state.isStar })}>
            <Text
              style={[
                styles.item,
                { color: this.state.isStar ? "#00D9B7" : "#fff" }
              ]}>
              Favorite
            </Text>
            <Icon
              style={{ color: this.state.isStar ? "#00D9B7" : "#B3B6B7", fontWeight: 300}}
              type="Entypo"
              name="check"
            />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          style={styles.filter}
          onPress={() => this.onFilter()} >
          <Text
            style={[
              styles.item,
              { alignSelf: "center", marginTop: 0, paddingTop: 5 }
            ]} >
            APPLY
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default connect(
  store => ({
    ...store
  }),
  dispatch => bindActionCreators(ActionCreators, dispatch)
)(ControlPanel);

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: "100%",
    height: window.height,
    backgroundColor: "#94999B",
    flexDirection: "column",
    padding: 8,
    marginTop: 10,
    paddingTop: 20
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1
  },
  name: {
    position: "absolute",
    left: 70,
    top: 20
  },
  item: {
    fontSize: 20,
    marginTop: 0,
    color: "#FFF",
    fontWeight: "300",
    paddingTop: 0
  },
  icon:{
    flexDirection: "row",
    width: "100%",
    height: 50,
    alignItems: "center",
    marginTop: 5,
    justifyContent: "space-between",
    backgroundColor: "transparent"
  },
  filter:{
    backgroundColor: "transparent",
    height: 40,
    width: 140,
    borderColor: "#fff",
    borderWidth: 1,
    marginRight: 10,
    alignItems: "center",
    alignSelf: "center"
  },
});
