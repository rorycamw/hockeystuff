import Firebase from 'firebase';

let config = {
    apiKey: "AIzaSyCY0wJFPefiqTXN1mBo8gVtWjjFEKWXIGM",
    authDomain: "nhl-stuff.firebaseapp.com",
    databaseURL: "https://nhl-stuff.firebaseio.com",
    projectId: "nhl-stuff",
    storageBucket: "nhl-stuff.appspot.com",
    messagingSenderId: "732255209350"
  };

let app = Firebase.initializeApp(config);
export const db = app.database();