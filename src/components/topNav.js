import React, { useState, useEffect } from "react";
import {  createNewSubreddit, showPosts, submitNewPost } from "../firebase";
// import { getProfilePicUrl } from "../firebase";

export default function TopNav(props) {
    const [subPosts, setSubPosts] = useState('dogs')
    const {posts} = props
    useEffect(() => {
        const subLinks = document.getElementsByClassName('subLinks')
        //somehow make useefect able to call setsubposts to change the display page with respective collection/sub posts
    })
  return (
    <div id="topNav">
      <div id="logo">
        <h1 id="title">Not</h1>
        <h1 id="title2">Reddit</h1>
      </div>
      <li>
        
      </li>
      <button
        id="signIn-btn"
        onClick={() => {
          // showPosts("hockey");
          // createNewSubreddit('beer')
          submitNewPost("beer", "I love beer!!");
        }}
      >
        Sign In
      </button>
      <button id="dogs" onClick={() => showPosts('dogs')}>
        Dogs
      </button>
    </div>
  );
}
