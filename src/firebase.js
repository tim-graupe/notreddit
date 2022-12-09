import "firebase/analytics";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";
import "firebase/compat/firestore";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signOut,
} from "firebase/auth";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

import {
  getFirestore,
  addDoc,
  getDoc,
  doc,
  collection,
  getDocs,
  limit,
  setDoc,
  updateDoc,
  arrayUnion,
  increment,
  arrayRemove,
  query,
  orderBy
} from "firebase/firestore";

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
    Type: "Text",
    // Submitted: time
  });
  await updateDoc(subref, {
    ID: subref.id,
  });
}

// //upload image
export async function addImg(sub, title, image) {
  const user = auth.currentUser;

  const subref = await addDoc(collection(db, sub), {
    Title: title,
    Content: image,
    Replies: [],
    Votes: 1,
    Voters: [],
    OP: user.displayName,
    Type: "Image",
    // Submitted: time
  });
  await updateDoc(subref, {
    ID: subref.id,
  });
}

export async function addLink(sub, title, link) {
  const user = auth.currentUser;

  const subref = await addDoc(collection(db, sub), {
    Title: title,
    Content: link,
    Replies: [],
    Votes: 1,
    Voters: [],
    OP: user.displayName,
    Type: "Image",
    // Submitted: time
  });
  await updateDoc(subref, {
    ID: subref.id,
  });
}

// export async function showPosts(subreddit) {
//   const querySnapshot = await getDocs(collection(db, subreddit));
//   querySnapshot.forEach((doc) => {
//     console.log(doc.data());
//   });
// }

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
  const pic = user.photoURL;
  console.log(user);
  const reply = { name: name, pic: pic, reply: comment, karma: 1 };
  const subRef = doc(db, sub, post);

  await updateDoc(subRef, {
    Replies: arrayUnion(reply),
  });
}

//upvote
export async function upvote(sub, post) {
  let ref = doc(db, sub, post);
  let com = await getDoc(ref);
  com.data().Voters.includes(auth.currentUser.uid)
    ? await updateDoc(ref, {
        Votes: increment(-1),
        Voters: arrayRemove(auth.currentUser.uid),
      })
    : await updateDoc(ref, {
        Votes: increment(1),
        Voters: arrayUnion(auth.currentUser.uid),
      });
}

export async function downvote(sub, post) {
  let ref = doc(db, sub, post);
  let com = await getDoc(ref);
  com.data().Voters.includes(auth.currentUser.uid)
    ? await updateDoc(ref, {
        Votes: increment(1),
        Voters: arrayUnion(auth.currentUser.uid),
      })
    : await updateDoc(ref, {
        Votes: increment(-1),
        Voters: arrayRemove(auth.currentUser.uid),
      });
}
//sort by best
