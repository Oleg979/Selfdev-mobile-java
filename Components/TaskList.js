import React, { Component } from "react";
import { List } from "native-base";
import { StyleSheet, View, Text } from "react-native";
import Task from "../Components/Task";

export default class TaskList extends Component {
  render() {
    return (
      <View style={styles.item}>
        {!this.props.tasks && (
          <Text style={styles.empty}>Loading tasks...</Text>
        )}
        {this.props.tasks && this.props.tasks.length == 0 && (
          <Text style={styles.empty}>You have no tasks for today</Text>
        )}
        <List style={styles.item}>
          {this.props.tasks &&
            this.props.tasks.map(task => (
              <Task
                time={task.time}
                tag={task.tag}
                title={task.title}
                key={task.id}
                id={task.id}
                checked={task.checked}
                deleteTask={id => this.props.deleteTask(id)}
                checkTask={(id, checked) =>
                  this.props.checkTask(id, checked)
                }
              />
            ))}
        </List>
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
    fontWeight: "500"
  },
  time: {
    fontWeight: "500"
  },
  item: {
    flex: 1
  },
  empty: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 25,
    marginTop: 200
  }
});
