// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{ getAuth, GoogleAuthProvider} from "firebase/auth"
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBg4B6SKWMYJajQPYorJgO-24wjDdXOLw4",
  authDomain: "react-project-1ca1a.firebaseapp.com",
  projectId: "react-project-1ca1a",
  storageBucket: "react-project-1ca1a.appspot.com",
  messagingSenderId: "1013407554546",
  appId: "1:1013407554546:web:49302846efb35abddd296b"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);