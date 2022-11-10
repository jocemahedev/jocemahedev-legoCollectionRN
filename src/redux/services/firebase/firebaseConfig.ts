import {getDatabase} from 'firebase/database';
import {getAuth} from 'firebase/auth';

import {initializeApp} from 'firebase/app';
import {
  FIREBASE_API_KEY,
  FIREBASE_DOMAIN,
  FIREBASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGEING_SENDER_ID,
  FIREABASE_APP_ID,
  FIREABASE_MEASUREMENT_ID,
} from '@env';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_DOMAIN,
  databaseURL: FIREBASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGEING_SENDER_ID,
  appId: FIREABASE_APP_ID,
  measurementId: FIREABASE_MEASUREMENT_ID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service

export const db = getDatabase(app);
export const auth = getAuth(app);
