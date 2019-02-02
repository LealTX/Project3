import firebase from 'firebase';
var config ={
    apiKey: "AIzaSyDOyvxkX5pNx2w7KIuQ2amYpsl1QSlQzRs",
    authDomain: "ut-project3.firebaseapp.com",
    databaseURL: "https://ut-project3.firebaseio.com",
    projectId: "ut-project3",
    storageBucket: "ut-project3.appspot.com",
    messagingSenderId: "305640031507"
  };
var fire = firebase.initializeApp(config);
export default fire;