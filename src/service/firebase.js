import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyC2E2t-mpJ3G28u8b3i3l2_3YZcQo3oAUY",
  authDomain: "weather-nutnet.firebaseapp.com",
  databaseURL: "https://weather-nutnet-default-rtdb.firebaseio.com",
  projectId: "weather-nutnet",
  storageBucket: "weather-nutnet.appspot.com",
  messagingSenderId: "886197621911",
  appId: "1:886197621911:web:6226edbfdc1b5f652f85d2"
};

firebase.initializeApp(firebaseConfig);
export const fire = firebase;
export const database = fire.database();

export default database;