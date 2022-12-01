import React, { useState } from "react";
import { signIn, signOutUser } from "../firebase";
import SubmissionModal from "./submitPost";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import SubmitImage from "./submitImage";

export default function TopNav(props) {
  const [showModal, setShowModal] = useState("");
  const [login, setLogin] = useState(false);
  const [file, setFile] = useState("")

  return (
    <div id="topNav">
      <div id="logo">
        <h1 id="title">Not</h1>
        <h1 id="title2">Reddit</h1>
        <SubmitImage />
      </div>
      <Popup trigger={<button>New Post</button>} position="center center">
        <SubmissionModal
          props={props}
          test={showModal}
          subs={props.subs}
          login={login}
        />
      </Popup>

      <button
        id="signIn-btn"
        onClick={() => {
          signIn();
          setLogin(true);
        }}
      >
        Google
      </button>
      <button
        onClick={() => {
          signOutUser();
          setLogin(false);
        }}
      >
        Sign Out
      </button>
      <div></div>
    </div>
  );
}
