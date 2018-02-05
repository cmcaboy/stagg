import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {Header, Button, Spinner, CardSection} from './src/components/common';
import firebase from 'firebase';
import LoginForm from './src/components/LoginForm';
import { Constants } from 'expo';

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  // Handle the login state with teh loggedIn state variable.
  state = { loggedIn: null};
  
  componentWillMount() {
    // Firebase authentication details gathered from my firebase account.
    firebase.initializeApp({
        apiKey: "AIzaSyCE7UpZW8NheU9jcX6rmXaADsQINK8tN50",
        authDomain: "auth-9567c.firebaseapp.com",
        databaseURL: "https://auth-9567c.firebaseio.com",
        projectId: "auth-9567c",
        storageBucket: "auth-9567c.appspot.com",
        messagingSenderId: "77667387510"
    });
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
    })
  }
  renderContent() {
    // use a switch statement to render a login screen, logout screen, or a spinner
    switch(this.state.loggedIn) {
      case true:
        return <CardSection><Button onPress={() => firebase.auth().signOut()}>Log Out</Button></CardSection>
      case false:
        return <LoginForm />
      default:
        return <View style={styles.spinnerStyle}><Spinner size="large"/></View>
    }
  }
  render() {
    return (
      <View>
        <UdaciStatusBar backgroundColor="purple" barStyle="light-content" />
        <Header headerText="Stagg" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
