import {getDatabase} from 'firebase/database';
import {initializeApp} from 'firebase/app';
import {FIREBASE_API_KEY, FIREBASE_DOMAIN, FIREBASE_URL} from '@env';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_DOMAIN,
  databaseURL: FIREBASE_URL,
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
