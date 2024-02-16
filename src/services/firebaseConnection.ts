import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-wrYB2e1ZJmn08XAbS9lEOjGm7QjDK3A",
  authDomain: "projeto-linketree.firebaseapp.com",
  projectId: "projeto-linketree",
  storageBucket: "projeto-linketree.appspot.com",
  messagingSenderId: "229560877266",
  appId: "1:229560877266:web:99c70923908aec064b6d0b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
