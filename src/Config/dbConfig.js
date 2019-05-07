import firebase from 'firebase/app';
import 'firebase/database';

let config = {
    apiKey: "AIzaSyBw37_MFoDVLvJL2RAr49uBeJyI3FgLStQ",
    authDomain: "notes-5c383.firebaseapp.com",
    databaseURL: "https://notes-5c383.firebaseio.com",
    projectId: "notes-5c383",
    storageBucket: "notes-5c383.appspot.com",
    messagingSenderId: "1077118662013"
};

firebase.initializeApp(config);

export default firebase;