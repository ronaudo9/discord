import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmNcMMafhEbNV_uTP3CaSZa4Wwfh5_mJE",
  authDomain: "discord-a567b.firebaseapp.com",
  projectId: "discord-a567b",
  storageBucket: "discord-a567b.appspot.com",
  messagingSenderId: "503534323940",
  appId: "1:503534323940:web:ea13bba661167ebb7504f1",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db }
