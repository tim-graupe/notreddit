import React, { useEffect, useRef, useState, useCallback } from "react";
import { db, showPosts } from "../firebase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import ShowPost from "./showPost";
import { displayPosts } from "../functions/displayPosts";

export default function CurrentSubPosts(props) {
  const [posts, setPosts] = useState([]);
  const [postOpen, setPostOpen] = useState(false)
  const [showBack, setShowBack] = useState(false)
  const [subList, setSubList] = useState([]);
  

  useEffect(() => {
    const checkPostOpen = () => {
      if (postOpen){
        document.getElementById('sublist').style.display = 'none'
        document.getElementById('back-btn').style.display = 'block'
      } else {
        document.getElementById('sublist').style.display = 'block'
        document.getElementById('back-btn').style.display = 'none'
      }
    }
    checkPostOpen()
  })
  //useeffect is causing the excessive reads
  useEffect(() => {
    const getPosts = async () => {
      const subRef = doc(db, "subreddits", props.currentSub);
      const sub = await getDoc(subRef);
      setPosts(sub.data().Posts);
      posts.push(sub.data().Posts);
    };
    getPosts();
  }, [props.currentSub]);

  function handleclick(e){
    setPostOpen(true)
    displayPosts(e.Title, e.OP, e.Votes, e.Content)
  }

  function goBack(){
    const post = document.getElementById('post')
    setPostOpen(false)
    while (post.firstChild){
      post.removeChild(post.firstChild)
    }
  }


  return (
    <div className="content">
      <div id="test"><button id="back-btn" onClick={() => {goBack()}}>Back</button>
      <button id="reply">Reply</button>
      <div id="post"></div>
      <div id="sublist">
      {posts.map((post) => {
        return (
          <div onClick={() => handleclick(post)}>
            <h1>{post.Title}</h1>
            <p>Submitted by {post.OP}</p>
            <p>Total replies: {post.Replies.length}</p>
          </div>
        );
      })}
      </div>
      </div>
    </div>
  );
}
