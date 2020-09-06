/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "@action/";
import { Actions } from "react-native-router-flux";
// import TimeAgo from "react-native-timeago";
import { Icon } from "native-base";

export class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: this.props.data.position,
      type: this.props.data.type,
      data: this.props.data.data,
      obj: this.props.data.data[this.props.data.position],
      titleText:
        this.props.data.type != "new"
          ? this.props.data.data[this.props.data.position].name
          : "",
      descText:
        this.props.data.type != "new"
          ? this.props.data.data[this.props.data.position].desc
          : ""
    };

    console.log(this.state);
  }

  componentWillReceiveProps(nextProps) {
    console.log("new Props");
    console.log(nextProps.data.data.length);

    if (nextProps.data.type == "update") {
      this.setState({
        data: nextProps.data.data,
        type: nextProps.data.type,
        position: nextProps.data.position
      });
    }

    if (nextProps.data.type == "new") {
      this.setState({
        data: [],
        type: nextProps.data.type,
        position: 0,
        titleText: "",
        descText: ""
      });
    }

    if (nextProps.data && nextProps.data.type != "new") {
      this.setState({
        position: nextProps.data.position,
        data: nextProps.data.data,
        obj: nextProps.data.data[nextProps.data.position],
        titleText: nextProps.data.data[nextProps.data.position].name,
        descText: nextProps.data.data[nextProps.data.position].desc
      });
    }
  }

  undo = () => {
    if (this.props.data.type == "new") {
      this.setState({ titleText: "", descText: "" });
    } else {
      this.setState({
        titleText: this.state.obj.name,
        descText: this.state.obj.desc
      });
    }
  };

  saveData = type => {
    let { data, position, titleText, descText } = this.state;
    var Newkey = data.length * Math.floor(Math.random() * 100 + 1);

    var newdata = {
      name: titleText,
      desc: descText,
      isStar: false,
      isHeart: false,
      time: new Date(),
      key: type == "new" ? Newkey : data[position].key
    };
    console.log("nrehxsjba",newdata);
    this.props.saveData(data, type, position, newdata);
    if (type == "new") {
      Actions.pop();
    } else {
      this.setState({ type: "view" });
    }
  };

  getUpdateView() {
    return (
      <View style={styles.container}>
        <View style={styles.container1}>
          <View style={styles.headerAction}>
            <TouchableOpacity
              style={styles.headerBackButton}
              onPress={_ => Actions.pop()}>
              <Icon
              style={{ color: "#555555", marginLeft: 10 }}
              type="MaterialIcons"
              name="arrow-back"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.headerButton}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={_ => this.undo()}>
              <Text style={{ fontSize: 15,color: "#000"}}>Undo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={_ =>
                this.saveData(
                  (this.state.type = "new" ? this.state.type : "edit")
                )}>
              <Text style={{ fontSize: 15,color: "#000"}}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.setState({ titleText: text })}
            placeholder="Heading"
            value={this.state.titleText}
            underlineColorAndroid="rgba(0,0,0,0)"
          />
          <TextInput
            style={styles.textInput}
            multiline={true}
            onChangeText={text => this.setState({ descText: text })}
            placeholder="Description"
            value={this.state.descText}
            underlineColorAndroid="rgba(0,0,0,0)"
          />
        </View>
      </View>
    );
  }

  getView() {
    return (
      <View style={styles.container}>
        <View style={styles.mainView}>
          <View style={styles.banner}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={_ => Actions.pop()}
            >
              <Icon
              style={{ color: "#555555", marginLeft: 10 }}
              type="MaterialIcons"
              name="arrow-back"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.edit}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={_ => this.setState({ type: "edit" })}
            >
              <Text style={styles.styleText}> Edit </Text>
            </TouchableOpacity>
          </View>
          </View>
        <View style={styles.editContant}>
        <View style={styles.editView} >
          <Text style={styles.headerText}>
            {this.state.obj.name}
          </Text>
          <Text style={styles.headerTextTime}>
            {/* <TimeAgo time={this.state.obj.time} interval={20000} /> */}
            {/*  */}
          </Text>
        </View>
        <View style={styles.editDesc}>
          <Text style={styles.descText}>
            {this.state.obj.desc}
          </Text>
        </View>
        </View>
      </View>
    );
  }

  render() {
    return this.state.type != "view" ? this.getUpdateView() : this.getView();
  }
}

export default connect(
  store => ({
    ...store
  }),
  dispatch => bindActionCreators(ActionCreators, dispatch)
)(Edit);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#CCC"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  headerButton: {
    width: "35%",
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  textInput: {
    fontSize: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#cccccc',
    marginTop: 10,
    fontWeight: "normal",
    color: "#000",
    textAlign: "left"
  },
  actionButton: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 7
  },
  edit: {
    width: "20%",
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
 
  headerText: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#000"
  },
  headerTextTime:{
    fontSize: 15,
    marginTop: 15,
    fontWeight: "normal",
    color: "#000"
  },
  descText: {
    fontSize: 13,
    width: "100%",
    height: "100%",
    marginLeft: 10,
    color: "#000"
  },
  mainView:{
    width: "100%",
    height: "10%",
    backgroundColor: "transparent",
    flexDirection: "row"
  },
  banner:{
    width: "80%",
    height: "100%",
    backgroundColor: "transparent"
  },
  backButton: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  editButton:{
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  styleText:{
    fontSize: 15,
    color: "#000"
  },
  inputView:{ 
    width: "100%",
    height: "100%",
    padding: 10,
    backgroundColor: "white",
   },
   headerAction:{
    width: "50%",
    height: "100%",
    backgroundColor: "transparent",
    justifyContent: 'flex-start',
  },
  headerBackButton:{
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 15
  },
  container1:{
    width: "100%",
    height: "12%",
    backgroundColor: "#CCC",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  editContant: {
    backgroundColor: "#CCC",
    width: "100%",
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  editDesc:{
     backgroundColor: "white", 
     padding: 15,
  },
  editView:{
    padding: 10,
    backgroundColor: "transparent",
    flexDirection: "column",
    marginLeft: 10
  },
});
