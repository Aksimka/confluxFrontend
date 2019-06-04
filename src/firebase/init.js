import firebase from 'firebase'
import firestore from 'firebase/firestore'
var config = {
    apiKey: "AIzaSyCbPxfGlAXT8gAaSiyw04oV5-smxXDidLw",
    authDomain: "conflux-6ed73.firebaseapp.com",
    databaseURL: "https://conflux-6ed73.firebaseio.com",
    projectId: "conflux-6ed73",
    storageBucket: "conflux-6ed73.appspot.com",
    messagingSenderId: "978484968618"
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({timestampsInSnapshots: true});

export default firebaseApp.firestore()
