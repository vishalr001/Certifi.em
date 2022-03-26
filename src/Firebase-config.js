import { initializeApp } from "firebase/app";
import { getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTlZ0lnJTTbp_11Md9Mw7hLRh8yYhuqEQ",
  authDomain: "certificate-app-83162.firebaseapp.com",
  projectId: "certificate-app-83162",
  storageBucket: "certificate-app-83162.appspot.com",
  messagingSenderId: "533913584041",
  appId: "1:533913584041:web:cdf126bb1b86d32ee704b8",
  measurementId: "G-K8V00KXYDY"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);