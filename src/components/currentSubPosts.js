import React, { useEffect, useState } from "react";
import { db, upvote } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import ShowPost from "./showPost";

export default function CurrentSubPosts(props) {
  const [posts, setPosts] = useState([]);
  const [currentPost, setPost] = useState("");
  const [postOpen, setPostOpen] = useState(false);

  useEffect(() => {
    const checkPostOpen = () => {
      if (postOpen) {
        document.getElementById("sublist").style.display = "none";
        document.getElementById("back-btn").style.display = "block";
      } else {
        document.getElementById("sublist").style.display = "block";
        document.getElementById("back-btn").style.display = "none";
      }
    };
    checkPostOpen();
  });

  useEffect(() => {
    let newArr = [];
    const getPosts = async () => {
      const querySnapshot = await getDocs(collection(db, props.currentSub));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        newArr.push(doc.data());
      });
      setPosts(newArr);
    };
    getPosts();
  }, [props.currentSub]);

  function handleclick(e) {
    setPostOpen(true);
    setPost(e);
  }

  function castUpvote(sub, id){
    //TODO: add ability to check if user has already up/downvoted post. maybe create user objects for when they login and create an array of all posts they vote on. if the post id is already in this array, have the function do nothing
  }

  function goBack() {
    const post = document.getElementById("post");
    setPost("");
    setPostOpen(false);
    while (post.firstChild) {
      post.removeChild(post.firstChild);
    }
  }

  return (
    <div className="content">
      <div id="test">
        <button
          id="back-btn"
          onClick={() => {
            goBack();
          }}
        >
          Back
        </button>
        <div id="post"></div>
        <div id="sublist">
          {posts.map((post) => {
            return (
              <div id={post}>
                {/* <button onClick={castUpvote(props.currentSub, post.ID)}>Upvote</button> */}
                <h1 onClick={() => handleclick(post)}>{post.Title}</h1>
                <p>Submitted by {post.OP}</p>
              </div>
            );
          })}
        </div>
      </div>
      <ShowPost
        title={currentPost.Title}
        OP={currentPost.OP}
        content={currentPost.Content}
        postID={currentPost.ID}
        currentSub={props.currentSub}
        postOpen={postOpen}
        replies={currentPost.Replies}
        Type = {currentPost.Type}
      />
    </div>
  );
}
