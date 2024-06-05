
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGyNTya7BglaY8u0XC7RW-MTRxl3-KJik",
  authDomain: "cinemaiabyzaid.firebaseapp.com",
  projectId: "cinemaiabyzaid",
  storageBucket: "cinemaiabyzaid.appspot.com",
  messagingSenderId: "666278405254",
  appId: "1:666278405254:web:bf2804e6fe82113be31d07"
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);



export const auth = getAuth();