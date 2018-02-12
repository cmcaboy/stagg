import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {Provider} from 'react-redux';
import {Header, Button, Spinner, CardSection} from './src/components/common';
import LoginForm from './src/components/LoginForm';
import { Constants } from 'expo';
import MainNavigator from './src/navigator';
import { PersistGate } from 'redux-persist/es/integration/react';
import {store,persistor} from './src/store';
import { firebase } from './src/firebase';

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

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({loggedIn: true});
        console.log('firebase auth: ',firebase.auth());
        console.log('firebase uid: ',firebase.auth().currentUser.uid);

        // We can use the firebase.auth().currentUSer.uid for our unique identifier.
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
        //return <MainNavigator />
      case false:
        return <LoginForm />
      default:
        return <View style={styles.spinnerStyle}><Spinner size="large"/></View>
    }
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <View style={{flex:1}}>
            <UdaciStatusBar backgroundColor="purple" barStyle="light-content" />
            {this.renderContent()}
          </View>
        </PersistGate>
      </Provider>
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
