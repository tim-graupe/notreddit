import React, { useEffect, useRef, useState, useCallback } from "react";
import { db, showPosts, leaveComment } from "../firebase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import ShowPost from "./showPost";
import { displayPosts } from "../functions/displayPosts";

export default function CurrentSubPosts(props) {
  const [posts, setPosts] = useState([]);
  const [currentPost, setPost] = useState("")
  const [postOpen, setPostOpen] = useState(false)
  const [showBack, setShowBack] = useState(false)
  const [subList, setSubList] = useState([]);
  

  useEffect(() => {
    const checkPostOpen = () => {
      if (postOpen){
        document.getElementById('sublist').style.display = 'none'
        document.getElementById('back-btn').style.display = 'block'
        // document.getElementById('reply').style.display = 'block'
      } else {
        document.getElementById('sublist').style.display = 'block'
        document.getElementById('back-btn').style.display = 'none';
        // document.getElementById('reply').style.display = 'none'

      }
    }
    checkPostOpen()
  })

  useEffect(() => {
    let newArr = []
    const getPosts = async () => {
      const querySnapshot = await getDocs(collection(db, props.currentSub));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        newArr.push(doc.data())
      });
      setPosts(newArr)
    };
    getPosts();
  }, [props.currentSub]);

  function handleclick(e){
    setPostOpen(true)
    setPost(e)
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
      <div id="post"></div>
      <div id="sublist">
      {posts.map((post) => {
        return (
          <div onClick={() => handleclick(post)}>
            <h1  onClick={() => {console.log(posts)}}>{post.Title}</h1>
            <p>Submitted by {post.OP}</p>
          </div>
        );
      })}
      </div>
      </div>
    </div>
  );
}
