import React, { Component } from "react";
import PTRView from "react-native-pull-to-refresh";
import { Text, View, Image, StyleSheet, AsyncStorage } from "react-native";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Body,
  Right,
  Title,
  Left,
  Toast
} from "native-base";
import { Font } from "expo";
import AddForm from "../Components/AddForm";
import TaskList from "../Components/TaskList";
import config from "../config/config";
import Stats from "../Components/Stats";

export default class HomePage extends Component {
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
  }
  async componentDidMount() {
    await this.refreshTasks();
    await this.getStats();
  }
  showToast = text =>
    Toast.show({
      text,
      buttonText: "Okay",
      position: "top",
      duration: 3000
    });

  state = {
    active: 0,
    tasks: null,
    stats: null
  };
  setActive = active => this.setState({ active });
  logout = async () => {
    await AsyncStorage.removeItem("token");
    this.props.goToLogin();
  };

  refreshTasks = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch(`https://secret-shelf-27377.herokuapp.com/tasks`, {
      method: "GET",
      headers: {
        "Authorization": token
      }
    })
      .then(data => data.json())
      .then(data => {
        console.log("data",data)
        if (data.error) this.logout();
        else this.setState({ tasks: data });
      }) 
      .catch(e => this.showToast("Error!"));
  };

  goToMainPage = () => {
    this.setActive(0);
    this.refreshTasks();
  };

  goToStatPage = () => {
    this.setActive(2);
    this.getStats();
  };
  //////////////////////////
  deleteTask = async id => {
    this.setState({ tasks: this.state.tasks.filter(task => task.id != id) });
    const token = await AsyncStorage.getItem("token");
    fetch(`https://secret-shelf-27377.herokuapp.com/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": token
      }
    })
      .then(data => data.json())
      .then(data => {
        if (!data.id) this.showToast("Error!");
        //this.refreshTasks();
      })
      .catch(e => this.showToast(e));
  };

  checkTask = async (id, isChecked) => {
    const token = await AsyncStorage.getItem("token");
    let type = isChecked ? "un" : "";
    fetch(`https://secret-shelf-27377.herokuapp.com/tasks/${type}check/${id}`, {
      method: "GET",
      headers: {
        "Authorization": token
      }
    })
      .then(data => data.json())
      .then(data => {
        console.log(type + "checked: " + id);
        if (!data.id) this.showToast("Error!");
        //this.refreshTasks();
      })
      .catch(e => this.showToast(e));
  };

  getStats = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch(`https://secret-shelf-27377.herokuapp.com/stats`, {
      method: "GET",
      headers: {
        "Authorization": token
      }
    })
      .then(data => data.json())
      .then(stats => {
        console.log("stats", stats)
        this.setState({
          stats
        });
      })
      .catch(e => this.showToast(e));
  };

  /////////////////////////////////////////////////
  render() {
    return (
      <Container style={styles.container}>
        <Header span style={styles.header}>
          <Left>
            <Image
              resizeMode="contain"
              style={styles.logo}
              source={require("../assets/logo1.png")}
            />
          </Left>
          <Right />
        </Header>
        <PTRView
          onRefresh={
            this.state.active == 0
              ? () => this.refreshTasks()
              : this.state.active == 2
              ? () => this.getStats()
              : () => false
          }
        >
          <Content>
            {this.state.active == 1 && (
              <AddForm goToMainPage={() => this.goToMainPage()} />
            )}
            {this.state.active == 0 && (
              <TaskList
                tasks={this.state.tasks}
                deleteTask={id => this.deleteTask(id)}
                checkTask={(id, isChecked) => this.checkTask(id, isChecked)}
              />
            )}
            {this.state.active == 2 && <Stats stats={this.state.stats} />}
          </Content>
        </PTRView>
        <Footer style={styles.footer}>
          <FooterTab style={styles.footer}>
            <Button
              active={this.state.active == 0}
              onPress={() => this.goToMainPage()}
            >
              <Icon name="apps" />
            </Button>
            <Button
              active={this.state.active == 1}
              onPress={() => this.setActive(1)}
            >
              <Icon name="add-circle" />
            </Button>
            <Button
              active={this.state.active == 2}
              onPress={() => this.goToStatPage()}
            >
              <Icon active name="flag" />
            </Button>
            <Button
              active={this.state.active == 3}
              onPress={() => {
                this.setActive(3);
                this.logout();
              }}
            >
              <Icon name="close-circle" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  logo: {
    position: "absolute",
    marginTop: 30,
    width: 350
  },
  container: {
    flex: 1,
    backgroundColor: "#3d566e"
  },
  header: {
    backgroundColor: "#2980b6"
  },
  footer: {
    backgroundColor: "#2980b6"
  }
});
