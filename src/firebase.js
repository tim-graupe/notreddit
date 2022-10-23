// Import the functions you need from the SDKs you need
import "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";
import "firebase/compat/firestore";

import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  setDoc,
  query,
  onSnapshot,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBS37--z75XhTfiMEcgh1njPi2cZ4zG0Vw",
  authDomain: "notreddit-e1231.firebaseapp.com",
  projectId: "notreddit-e1231",
  storageBucket: "notreddit-e1231.appspot.com",
  messagingSenderId: "83722013940",
  appId: "1:83722013940:web:a50541eb521a73e53d62a1",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = getFirestore(app);

//adds submission to sub
export async function submitNewPost(subreddit, title) {
  try {
    await addDoc(collection(getFirestore(), subreddit), {
      title: title,
      content: "content",
      poster: "poster",
      votes: 1,
      replies: [],
    });
  } catch (error) {
    console.error("Error: ", error);
  }
}




export async function showPosts(subreddit) {
  const querySnapshot = await getDocs(collection(db, subreddit));
  const posts = document.getElementById('posts')
  posts.textContent = ""
  querySnapshot.forEach((doc) => {
    let data = doc.data();
    let h1 = document.createElement('h2');
    let p = document.createElement('p')
    h1.setAttribute('class', 'posts')
    h1.textContent = data.title;
    p.textContent = `Submitted by ${data.poster}`
    h1.appendChild(p)
    p.style.fontSize = '10px'
    posts.appendChild(h1)
    console.log(data)
    return data;
  });
}

// export async function showPosts(subreddit) {
//   const querySnapshot = await getDocs(collection(db, subreddit));
//   querySnapshot.forEach((doc) => {
//     return doc.data();
//   });
// }
