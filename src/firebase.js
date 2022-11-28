import "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";
import "firebase/compat/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getStorage, ref } from "firebase/storage";

import {
  getFirestore,
  addDoc,
  doc,
  getDoc,
  collection,
  getDocs,
  setDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
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
export const storage = getStorage(app);
const auth = getAuth(app);

//sign in
export function signIn() {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider);

  getRedirectResult(auth)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessTokenl;

      const user = result.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMsg = error.mesage;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(email);
    });
}

//signout
export function signOutUser() {
  const user = auth.currentUser;

  signOut(auth)
    .then(() => {
      // console.log('good to go')
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
  console.log(user);
}

//adds submission to sub
export async function submitNewPost(sub, title, content) {
  const user = auth.currentUser;

  const subref = await addDoc(collection(db, sub), {
    Title: title,
    Content: content,
    Replies: [],
    Votes: 1,
    OP: user.displayName,
    // Submitted: time
  });
  await updateDoc(subref, {
    ID: subref.id,
  });
}

export async function showPosts(subreddit) {
  const querySnapshot = await getDocs(collection(db, subreddit));
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  });
}

export async function showSubs() {
  let subArr = [];
  const querySnapshot = await getDocs(collection(db, "subreddits"));
  querySnapshot.forEach((doc) => {
    subArr.push(doc.data().sub);
  });
}

export async function createNewSubreddit() {
  let newSub = prompt("Enter sub name");
  await setDoc(doc(db, "subreddits", newSub), {
    // sub: newSub
  });
}

//leave comment
export async function leaveComment(sub, post, comment) {
  const user = auth.currentUser;
  const name = user.displayName;
  const reply = {name: name, reply: comment, karma: 1}
  const subRef = doc(db, sub, post);

  await updateDoc(subRef, {
    Replies: arrayUnion(
      reply
    ),
  });
}

//upvote
export async function upvote() {
  let ref = doc(db, "subreddits", "Posts");
  ref.forEach((doc) => {
    console.log(doc.Title);
  });
}

//upload file
export async function submitURL(url) {
  try {
    new URL(url);
    console.log(document.title);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
