
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDOeBPpl0QczgdPZCixxS33LWimU87DT1c",
  authDomain: "cinemania-gpt.firebaseapp.com",
  projectId: "cinemania-gpt",
  storageBucket: "cinemania-gpt.appspot.com",
  messagingSenderId: "797757782393",
  appId: "1:797757782393:web:288b48a6569d135dfbd7a8",
  measurementId: "G-YKVGSPZQ4J"
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);



export const auth = getAuth();