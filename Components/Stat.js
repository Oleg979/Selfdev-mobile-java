import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ListItem, Thumbnail } from "native-base";
export default class Stat extends Component {
  render() {
    return (
      <View>
        <ListItem itemDivider style={styles.divider}>
          <Text style={styles.tag}>
            {this.props.fullDate.replace(/\s/g, ".")}
          </Text>
        </ListItem>
        {this.props.tasks.length > 0 &&
          this.props.tasks.map(task => (
            <ListItem
              key={task.id}
              last={
                this.props.tasks.indexOf(task) == this.props.tasks.length - 1
              }
            >
              <Thumbnail
                source={
                  task.checked
                    ? require("../assets/checked.png")
                    : require("../assets/exclamation-mark.png")
                }
                resizeMode="contain"
                style={{ width: "10%" }}
              />
              <Text style={styles.text}>{task.title}</Text>
            </ListItem>
          ))}
      </View>
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
    fontWeight: "500",
    fontSize: 18,
    marginLeft: 15
  },
  time: {
    fontWeight: "500"
  },
  item: {
    flex: 1
  },
  divider: {
    backgroundColor: "rgba(225,225,225,0.2)"
  }
});
