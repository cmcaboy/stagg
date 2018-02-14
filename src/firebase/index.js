  import * as firebase from 'firebase';
  import 'firebase/firestore';
  import moment from 'moment';
  import uuid from 'uuid';
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCn91oD-gS6YjE53f5adbC5252qcHyjEjs",
    authDomain: "stagg-test.firebaseapp.com",
    databaseURL: "https://stagg-test.firebaseio.com",
    projectId: "stagg-test",
    storageBucket: "",
    messagingSenderId: "236430416072"
  };
  firebase.initializeApp(config);

  const database = firebase.database();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  // Practice

  
  const db = firebase.firestore();
  
  const newUser = {
    uid: '123457',
    age: 30,
    name: 'Steve',
    work: 'Trello',
    school: 'Columbia',
    description: 'I love ducktales',
    profilePic: 'https://media1.fdncms.com/indyweek/imager/u/magnum/5321631/michaelpeterson2.jpg',
    ancillaryPics: {},
    gender: 'male'
  }
/*
  console.log('in firebase script');
  
  db.collection(`users`).doc(`${newUser.uid}`).set({...newUser})
        .then(() => console.log(`update complete`))
        .catch((error) => console.log("Error writing document: ",error));

  db.collection(`users`).get()
        .then((data) => data.forEach((datum) => console.log(datum.data())))
        .catch((error) => console.log("Error writing document: ",error));
*/
  export { firebase, googleAuthProvider, database as default };
