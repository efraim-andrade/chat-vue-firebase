import firebase from 'firebase'
import firestore from 'firebase/firestore'

var config = {
  apiKey: "AIzaSyC7rto6nyKlndobBamqV0dh3hSNHdLHsRE",
  authDomain: "ninja-chat-9814b.firebaseapp.com",
  databaseURL: "https://ninja-chat-9814b.firebaseio.com",
  projectId: "ninja-chat-9814b",
  storageBucket: "ninja-chat-9814b.appspot.com",
  messagingSenderId: "465162490229"
};

const db = firebase.initializeApp(config);

export default db.firestore()
