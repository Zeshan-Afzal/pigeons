// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIERBASE_API_KEY,
  authDomain: "embland-73077.firebaseapp.com",
  projectId: "embland-73077",
  storageBucket: "embland-73077.appspot.com",
  messagingSenderId: "380777614575",
  appId: "1:380777614575:web:333959794ae7d9b2ce5f1a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
