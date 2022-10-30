import React, {  useEffect, useRef, useState } from "react";
import {
  createNewSubreddit, showPosts, showSubs

} from "../firebase";



export default function TopNav() {




  return (
    <div id="topNav">
      <div id="logo">
        <h1 id="title">Not</h1>
        <h1 id="title2">Reddit</h1>
      </div>
      <li></li>
      <button id="signIn-btn">Sign In</button>
      <button
        className="nav-divs"
        onClick={() => {
          const form = document.getElementById("submissionForm");
          form.style.display = "block";
        }}
      >
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
