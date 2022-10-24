import {getDatabase} from 'firebase/database';
import {initializeApp} from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBUi6oGis0AcYJJI0gKkNrdOdKC63W7cLQ',
  authDomain: 'my-lego-app-46277.firebaseapp.com',
  databaseURL: 'https://my-lego-app-46277-default-rtdb.firebaseio.com',
  projectId: 'my-lego-app-46277',
  storageBucket: 'my-lego-app-46277.appspot.com',
  messagingSenderId: '674439152761',
  appId: '1:674439152761:web:8c6fdb8e1b944d75db00a8',
  measurementId: 'G-NPS1L225CZ',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service

export const db = getDatabase(app);
