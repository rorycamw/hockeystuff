const firebase = require('firebase')

let config = {
    apiKey: "AIzaSyCY0wJFPefiqTXN1mBo8gVtWjjFEKWXIGM",
    authDomain: "nhl-stuff.firebaseapp.com",
    databaseURL: "https://nhl-stuff.firebaseio.com",
    projectId: "nhl-stuff",
    storageBucket: "nhl-stuff.appspot.com",
    messagingSenderId: "732255209350"
  };

var app = firebase.initializeApp(config)
var db = app.database()

args = process.argv

console.log(args[2]+','+args[3]);

db.ref('/teams').push({
	teamtag: args[2],
	teamname: args[3]
})