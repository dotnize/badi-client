import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAn5I5inz6GHSEnY8p0PKs7kG547J1OB4Q",
  authDomain: "badi-ph.firebaseapp.com",
  projectId: "badi-ph",
  storageBucket: "badi-ph.appspot.com",
  messagingSenderId: "433729763988",
  appId: "1:433729763988:web:90b0f2af57a851809e5281",
};
const firebase = initializeApp(firebaseConfig);

export const storage = getStorage(firebase);
