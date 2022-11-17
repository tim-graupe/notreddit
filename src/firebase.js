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

import { getStorage, ref } from "firebase/storage";

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
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { displayPosts } from "./functions/displayPosts";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBS37--z75XhTfiMEcgh1njPi2cZ4zG0Vw",
  authDomain: "notreddit-e1231.firebaseapp.com",
  databaseURL: "https://notreddit-e1231-default-rtdb.firebaseio.com",
  projectId: "notreddit-e1231",
  storageBucket: "notreddit-e1231.appspot.com",
  messagingSenderId: "83722013940",
  appId: "1:83722013940:web:a50541eb521a73e53d62a1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

//adds submission to sub
export async function submitNewPost(subreddit, title, content) {
  const subRef = doc(db, "subreddits", subreddit);
  await updateDoc(subRef, {
    Posts: arrayUnion({
      Content: content,
      OP: null,
      Replies: [],
      Title: title,
      Votes: 1,
      // SubmissionTime: serverTimestamp(),
    }),
  });
}

export async function showPosts(subreddit) {
  const docRef = doc(db, "subreddits", subreddit);
  const docSnap = await getDoc(docRef);
  const postArr = [];
  if (docSnap.exists()) {
    const posts = document.getElementById("test");
    posts.textContent = "";
    let data = docSnap.data().Posts;
    data.forEach((post) => {
      displayPosts(post.Title, post.OP, post.Votes, post.Replies);
      postArr.push(post);
    });
  } else {
    console.log("404");
  }

  return postArr;
}

export async function showSubs() {
  let subArr = [];
  const querySnapshot = await getDocs(collection(db, "subreddits"));
  querySnapshot.forEach((doc) => {
    subArr.push(doc);
  });
}

export async function createNewSubreddit() {
  let newSub = prompt("Enter sub name");
  await setDoc(doc(db, "subreddits", newSub), {
    Posts: [],
  });
}

// export async function submitImg() {
//   const storage = getStorage();
//   const 
// }
