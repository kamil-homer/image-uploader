import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqT6aiRqSNL-ZoDLkNTo5pblQCCVbmtnE",
  authDomain: "image-uploader-b830e.firebaseapp.com",
  projectId: "image-uploader-b830e",
  storageBucket: "image-uploader-b830e.appspot.com",
  messagingSenderId: "95299222057",
  appId: "1:95299222057:web:30cd53b4ff5f95d645ba38",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
