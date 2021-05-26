var firebaseConfig = {
    apiKey: "AIzaSyBo8NjcJrvriG-FaDE-HaZYpiWJ6KdBXIU",
    authDomain: "wi-ken.firebaseapp.com",
    projectId: "wi-ken",
    storageBucket: "wi-ken.appspot.com",
    messagingSenderId: "638484939881",
    appId: "1:638484939881:web:d56b5ec5c811dac5c94ef8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  let auth = firebase.auth();
  let db = firebase.firestore();
  let storage = firebase.storage();