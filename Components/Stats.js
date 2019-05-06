import React, { Component } from "react";
import { List, ListItem, Text } from "native-base";
import { StyleSheet, View } from "react-native";
import Stat from "./Stat";

export default class componentName extends Component {
  render() {
    return (
      <View>
        {this.props.stats &&
          Object.keys(this.props.stats).length ==
            0 && <Text style={styles.empty}>You have no stats</Text>}
        <List renderSeparator={false}>
          {Object.entries(this.props.stats)
            .map((stat, index) => (
              <Stat
                fullDate={stat[0].split("-").reverse().join("-")}
                tasks={stat[1]}
                key={stat[0]}
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
  divider: {
    backgroundColor: "rgba(225,225,225,0.2)"
  },
  empty: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 25,
    marginTop: 200
  }
});
