  import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyDttYh4LyeO8v0gy5KF-uMhlsO-KrknHYQ",
    authDomain: "health4life-ea4f8.firebaseapp.com",
    databaseURL: "https://health4life-ea4f8-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "health4life-ea4f8",
    storageBucket: "health4life-ea4f8.appspot.com",
    messagingSenderId: "793595792486",
    appId: "1:793595792486:web:1f7d7a11c322cd9c0171a7",
    measurementId: "G-KW3XD1GEQE"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default fire;