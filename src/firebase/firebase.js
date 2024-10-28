import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAXe-KbPdl8uXDCdaXYZBm8bOg7e2rDaWs",
    authDomain: "e-commerce-1083b.firebaseapp.com",
    projectId: "e-commerce-1083b",
    storageBucket: "e-commerce-1083b.appspot.com",
    messagingSenderId: "756715505314",
    appId: "1:756715505314:web:99a8c06f6a83c278ec79fb",
    measurementId: "G-SVJ8JMJKHC"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);