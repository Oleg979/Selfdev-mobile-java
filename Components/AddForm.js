import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  AsyncStorage
} from "react-native";
import { Toast } from "native-base";
import config from "../config/config";

export default class AddForm extends Component {
  state = {
    text: null,
    tag: null,
    hours: null,
    minutes: null
  };
  handleTextChange = text => this.setState({ text });
  handleTagChange = tag => this.setState({ tag });
  handleHoursChange = hours => this.setState({ hours });
  handleMinutesChange = minutes => this.setState({ minutes });
  addTask = async () => {
    let { text, tag, hours, minutes } = this.state;
    console.log(text, tag, hours, minutes);
    const token = await AsyncStorage.getItem("token");
    const mobileToken = await AsyncStorage.getItem("mobileToken");
    if (
      text == null ||
      text.trim() == "" ||
      tag == null ||
      tag.trim() == "" ||
      hours == null ||
      hours.trim() == "" ||
      hours > 23 ||
      hours < 0 ||
      minutes == null ||
      minutes.trim() == "" ||
      minutes > 59 ||
      minutes < 0
    )
      this.showToast("Incorrect field values!");
    else {
      let date = new Date();
      date.setHours(+hours);
      date.setMinutes(+minutes);

      fetch(`https://secret-shelf-27377.herokuapp.com/tasks`, {
        method: "POST",
        headers: {
          "Authorization": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: text,
          tag: tag,
          time: `${this.state.hours}:${this.state.minutes}`
        })
      })
        .then(data => {
          this.setState(
            {
              text: "",
              hours: "",
              minutes: "",
              tag: ""
            },
            () => {
              this.props.goToMainPage();
              console.log("done");
            }
          );
        })
        .catch(e => this.showToast(e));
        const now = new Date();
        
        const myDate = new Date(now); 
        myDate.setHours(hours); 
        myDate.setMinutes(minutes); 
        myDate.setSeconds(0) 
        myDate.setMilliseconds(0); 
        
        const x1 = Date.parse(now)/1000 
        const x2 = Date.parse(myDate)/1000
        console.log(x2, x1)
        setTimeout(() => {
          return fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              to: mobileToken,
              title: "You have a task!",
              body: `Don't forget to ${text}!`,
              data: {
                message: `Don't forget to ${text}!`
              }
            })
          })
        }, (x2-x1)*1000); 
  }}
  showToast = text =>
    Toast.show({
      text,
      buttonText: "Okay",
      position: "top",
      duration: 3000
    });
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          returnKeyType="next"
          placeholder="Text"
          placeholderTextColor="rgba(225,225,225,0.7)"
          onChangeText={text => this.handleTextChange(text)}
          onSubmitEditing={() => this.tagInput.focus()}
          value={this.state.text}
        />

        <TextInput
          style={styles.input}
          placeholder="Tag"
          placeholderTextColor="rgba(225,225,225,0.7)"
          onChangeText={text => this.handleTagChange(text)}
          ref={input => (this.tagInput = input)}
          onSubmitEditing={() => this.hoursInput.focus()}
          value={this.state.tag}
        />

        <TextInput
          style={styles.input}
          placeholder="Hours"
          placeholderTextColor="rgba(225,225,225,0.7)"
          keyboardType="numeric"
          onChangeText={text => this.handleHoursChange(text)}
          ref={input => (this.hoursInput = input)}
          onSubmitEditing={() => this.minutesInput.focus()}
          value={this.state.hours}
        />
        <TextInput
          style={styles.input}
          placeholder="Minutes"
          placeholderTextColor="rgba(225,225,225,0.7)"
          keyboardType="numeric"
          onChangeText={text => this.handleMinutesChange(text)}
          ref={input => (this.minutesInput = input)}
          value={this.state.minutes}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.addTask()}
        >
          <Text style={styles.buttonText}>ADD TASK</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 60,
    backgroundColor: "rgba(225,225,225,0.2)",
    borderRadius: 5,
    marginBottom: 10,
    padding: 15,
    color: "#fff",
    fontSize: 20,
    fontWeight: "600"
  },
  buttonContainer: {
    borderRadius: 5,
    backgroundColor: "#2980b6",
    paddingVertical: 15
  },
  buttonContainerGrey: {
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: "#878484",
    paddingVertical: 15
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700"
  },
  loginButton: {
    backgroundColor: "#2980b6",
    color: "#fff"
  }
});
