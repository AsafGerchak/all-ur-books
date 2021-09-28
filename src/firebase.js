import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBqMyr0lFYegmby5tPVZ4EFuvrdW_r2F3Q",
  authDomain: "learning-firebase-5af7d.firebaseapp.com",
  databaseURL: "https://learning-firebase-5af7d-default-rtdb.firebaseio.com",
  projectId: "learning-firebase-5af7d",
  storageBucket: "learning-firebase-5af7d.appspot.com",
  messagingSenderId: "743669936425",
  appId: "1:743669936425:web:a8222946eac352a0ddc738"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;