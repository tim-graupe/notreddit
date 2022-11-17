import React, {  useEffect, useRef, useState } from "react";
import {
  createNewSubreddit, showPosts, showSubs

} from "../firebase";
import CurrentSubPosts from "./currentSubPosts";
import SubmissionModal from "./submitPost";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


export default function TopNav(props) {
  const [showModal, setShowModal] = useState("")



  return (
    <div id="topNav">
      <div id="logo">
        <h1 id="title">Not</h1>
        <h1 id="title2">Reddit</h1>
        
      </div>
      <Popup trigger={<button>Click</button>} position="center center">
      <SubmissionModal props={props} test={showModal} subs={props.subs}/>
      </Popup>
      <button id="signIn-btn">Sign In</button>
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
