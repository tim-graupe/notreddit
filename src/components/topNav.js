import React, {  useEffect, useRef, useState } from "react";
import {
  createNewSubreddit, showPosts, showSubs

} from "../firebase";
import CurrentSubPosts from "./currentSubPosts";
import SubmissionModal from "./submitPost";



export default function TopNav(props) {
  const [showModal, setShowModal] = useState(false)



  return (
    <div id="topNav">
      <div id="logo">
        <h1 id="title">Not</h1>
        <h1 id="title2">Reddit</h1>
        
      </div>
      <SubmissionModal />
      <button id="signIn-btn">Sign In</button>
      <button>
        New Post
      </button>
      <button
        id="new-sub"
        onClick={() => {
          createNewSubreddit();
        }}
      >
        Create New Sub
      </button>
        <div>
        </div>
    </div>
  );
}
