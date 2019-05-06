import React, { Component } from "react";
import { StyleSheet, Alert, AsyncStorage } from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Toast
} from "native-base";
import config from "../config/config";

export default class Task extends Component {
  state = {
    completed: false
  };
  componentDidMount() {
    this.setState({ completed: this.props.checked });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ completed: nextProps.checked });
  }

  check = (id, checked) => {
    this.props.checkTask(id, this.state.completed);
    this.setState({ completed: !this.state.completed });
  };

  confirmDelete = id => {
    Alert.alert("Delete task", "Are you sure?", [
      {
        text: "YES",
        onPress: () => this.props.deleteTask(id)
      },
      { text: "NO", onPress: () => console.log("No Pressed"), style: "cancel" }
    ]);
  };
  render() {
    return (
      <ListItem
        avatar
        onLongPress={() => this.confirmDelete(this.props.id)}
        onPress={() => this.check(this.props.id, this.props.checked)}
        last={true}
      >
        <Left>
          <Thumbnail
            source={
              this.state.completed
                ? require("../assets/checked.png")
                : require("../assets/exclamation-mark.png")
            }
          />
        </Left>
        <Body>
          <Text style={styles.tag}>{this.props.tag}</Text>
          <Text style={styles.text}>{this.props.title}</Text>
        </Body>
        <Right>
          <Text style={styles.time}>{this.props.time}</Text>
        </Right>
      </ListItem>
    );
  }
}

const styles = StyleSheet.create({
  tag: {
    color: "black",
    fontWeight: "500",
    fontSize: 20
  },
  text: {
    color: "white",
    fontWeight: "500"
  },
  time: {
    fontWeight: "500"
  },
  item: {
    flex: 1
  }
});
