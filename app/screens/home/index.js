import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  AsyncStorage,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  ToastAndroid,
  View
} from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "@action/";

import { Actions } from "react-native-router-flux";
//import TimeAgo from "react-native-timeago";
import SplashScreen from 'react-native-splash-screen';

import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";

import ActionButton from "react-native-action-button";

import Drawer from "react-native-drawer";
import ControlPanel from "../controlPanel";
import { Icon } from "native-base";


export class App extends Component {
  constructor(props) {
    super(props);
    this.props.getIntialData(this.props.data);
    this.state = {
      listType: "FlatList",
      isOpen: false,
      selectedItem1: "About"
    };
  }
  closeDrawer = () => {
    this._drawer.close();
  };

  openDrawer = () => {
    this._drawer.open();
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  compare = (a, b) => {
    let comparison = 0;

    if (a.time < b.time) {
      comparison = 1;
    } else if (b.time > a.time) {
      comparison = -1;
    }

    return comparison;
  };

  onMenuItemSelected = item => {
    this.setState({
      isOpen: false,
      selectedItem: item
    });
    console.log(item);
  };

  componentDidMount() {
    SplashScreen.hide();
  }

  closeRow(rowMap, rowKey) {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.type == "view" || nextProps.data.type == "new") {
      this.setState({
        isOpen: false
      });
      Actions.edit();
    }
    if (
      nextProps.data &&
      nextProps.data.isfilter &&
      nextProps.data.filter.length == 0
    ) {
      ToastAndroid.show("No  Records found", ToastAndroid.SHORT);
      this.setState({
        listViewData: nextProps.data.data
      });
    } else if (nextProps.data) {
      this.setState({
        listViewData: nextProps.data.isfilter
          ? nextProps.data.filter
          : nextProps.data.data,
        isOpen: false
      });
    }
  }

  deleteRow(rowMap, rowKey) {
    this.closeRow(rowMap, rowKey);
    this.props.deleteRow(rowMap, this.props.data.data, rowKey);
    this.setState({ isOpen: false });
  }

  setStar(rowMap, rowKey) {
    this.closeRow(rowMap, rowKey);
    this.props.updateStar(rowMap, this.props.data.data, rowKey);
  }

  saveData(array) {
    console.log(array.length);
    return AsyncStorage.setItem("data", JSON.stringify(array))
      .then(json => console.log("sucess saved!"))
      .catch(error => console.log("error!"));
  }

  setHeart(rowMap, rowKey) {
    this.closeRow(rowMap, rowKey);
    this.props.updateHeart(rowMap, this.props.data.data, rowKey);
  }

  onRowDidOpen = (rowKey, rowMap) => {
    console.log("This row opened", rowKey);
    setTimeout(() => {
      this.closeRow(rowMap, rowKey);
    }, 2000);
  };

  getTime = data => {
    const time = data.item.time;
    return
    // <TimeAgo time={time} interval={20000} />;
  };


  render() {
    return (
      <Drawer
      ref={ref => (this._drawer = ref)}
      tapToClose={true}
      openDrawerOffset={0.4} 
      panCloseMask={0.2}
      closedDrawerOffset={-4}
      side="right"
      content={<ControlPanel closeDrawer={this.closeDrawer} />}
      open={this.state.isOpen}
    >
      <StatusBar backgroundColor="#CCC" barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.head}>
            <Text style={styles.header}>
              Notely
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterDesing}
            onPress={this.toggle}
           >
            <Icon
              style={{ color: "#000000", marginLeft: 10 }}
              type="Ionicons"
              name="md-filter-sharp"
              />
          </TouchableOpacity>
        </View>
        <View style={styles.listViewHere}>
        <SwipeListView
          useFlatList
          data={this.state.listViewData}
          renderItem={(data, rowMap) => (
            <TouchableHighlight
              onPress={() => this.props.peformEdit(rowMap, data.index)}
              style={styles.rowFront}
              underlayColor={"#FFF"}
            >
              <View style={styles.main} >
                <View style={styles.textContainer}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#000",
                      fontWeight: "bold"
                    }}
                  >
                    {data.item.name}
                  </Text>

                  <Text style={styles.text}>
                    {data.item.desc}
                  </Text>

                  <Text
                    style={{
                      fontSize: 12,
                      color: "#ccc",
                      marginTop: 5
                    }}
                  >
                    {/* {dateFormat(data.item.time, "mmm d, yy, h:MM TT")} */}
                    {this.getTime(data)}
                  </Text>
                </View>
                <View style={styles.iconStyle}>
                  <TouchableOpacity
                    style={styles.star}
                    onPress={_ => this.setStar(rowMap, data.index)}
                  > 
                    <Icon
                      style={{ color: data.item.isStar ? "orange" : "#ccc", marginRight: 6 }}
                      type="FontAwesome"
                      name="star"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.heart}
                    onPress={_ => this.setHeart(rowMap, data.index)}
                  >
                    <Icon
                      style={{ color: data.item.isHeart ? "red" : "#ccc"}}
                      type="FontAwesome"
                      name="heart"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableHighlight>
          )}
          renderHiddenItem={(data, rowMap) => (
            <View style={styles.rowBack}>
              <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={_ => this.deleteRow(rowMap, data.item.key)}
              >
                <Icon
                    style={{ color: "#FFFFFF"}}
                    type="FontAwesome"
                    name="trash-o"
                />
              </TouchableOpacity>
            </View>
          )}
          leftOpenValue={0}
          disableRightSwipe={true}
          rightOpenValue={-150 / 2}
          onRowDidOpen={this.onRowDidOpen}
        />
        </View>
      </View>

      <ActionButton
        buttonColor="rgba(231,76,60,1)"
        onPress={() => this.props.createNew()}
      />
    </Drawer>
    );
  }
}

export default connect(
  store => ({
    ...store
  }),
  dispatch => bindActionCreators(ActionCreators, dispatch)
)(App);




const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  standalone: {
    marginTop: 30,
    marginBottom: 30
  },
  standaloneRowFront: {
    alignItems: "center",
    justifyContent: "center",
    height: 50
  },
  standaloneRowBack: {
    alignItems: "center",
    backgroundColor: "#8BC645",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15
  },
  backTextWhite: {
    color: "#FFF",
    fontSize: 12
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#FFF",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 100
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 75
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0
  },
  controls: {
    alignItems: "center",
    marginBottom: 30
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 5
  },
  switch: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 10,
    width: Dimensions.get("window").width / 4
  },
  headerContainer:{
    width: "100%",
    height: "12%",
    padding: 20,
    backgroundColor: "#CCC",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  iconStyle:{
    width: "20%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  header:{
    color: "#000",
    fontSize: 26,
    fontWeight: "normal",
  },
  heart:{
    width: "60%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  star:{
    width: "40%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  text:{
    fontSize: 15,
    color: "#ccc"
  },
  textContainer:{
    flexDirection: "column",
    justifyContent: "center",
    width: "80%",
    alignItems: "flex-start",
    margin: 2,
    padding: 2,
    height: "100%",
    backgroundColor: "transparent"
  },
  main:{
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "100%"
  },
  head:{
    alignSelf: "center",
    marginLeft: 10
  },
  filterDesing:{ 
    alignSelf: "center", 
    marginRight: 10 
  },
  listViewHere: {
    padding: 15
  } 
});
