import React, { useEffect, useState } from "react";
import { db, upvote, downvote, sortByBest } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import SubmissionModal from "./submitPost";
import SubmitImage from "./submitImage";
import thumbs_up from '../icons/thumbs_up.png'
import thumbs_down from '../icons/thumbs_down.png'
import ShowPost from "./showPost";
import { NewSubmission } from "./submissionForm";

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
        newArr.push(doc.data());
      });
      setPosts(newArr);
    };
    getPosts();
  }, [props.currentSub]);

  function showForm(){
    document.getElementById("submission-form").style.display = 'block'
    document.getElementById('sublist').style.display = 'none'
  }

  function handleclick(e) {
    setPostOpen(true);
    setPost(e);
  }
  function goBack() {
    setPost("");
    setPostOpen(false);

  }
//TODO: set up a function to setstate of how posts will be sorted. allow a dropdown to change the sorting
  return (
    <div className="content">
      <button onClick={() => {
        showForm()
      }}id="new-post">New Post</button>
        <button
          id="back-btn"
          onClick={() => {
            goBack();
          }}
        >
          Back
        </button>
        <div id="sublist">
          {posts.map((post) => {
            return (
              <div id={post}>
                <h1 onClick={() => handleclick(post)}>{post.Title}</h1>
                <img className="upvote" src={thumbs_up} alt="upvote" onClick={() => upvote(props.currentSub, post.ID)} />
                {post.Votes}
                <img className="downvote" src={thumbs_down} alt="downvote" onClick={() => downvote(props.currentSub, post.ID)} />
                <p>Submitted by {post.OP}</p>
              </div>
            );
          })}
        </div>

        <div id="submission-form">
          <NewSubmission props={props} currentSub={props.currentSub}/>
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
