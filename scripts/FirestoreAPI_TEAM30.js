//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyBNB_Ko5sAXC3xoVmyaShA0ckxxOUJE9Ok",
    authDomain: "botanical-breakfast.firebaseapp.com",
    projectId: "botanical-breakfast",
    storageBucket: "botanical-breakfast.appspot.com",
    messagingSenderId: "504160188943",
    appId: "1:504160188943:web:4a9c95426c516649f4817a"
  };

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();