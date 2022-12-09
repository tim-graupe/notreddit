import React, { useState } from "react";
import SubmissionModal from "./submitPost";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import SubmitImage from "./submitImage";

export default function TopNav(props) {

  return (
    <div id="topNav">
      <div id="logo">
        <h1 id="title">Not</h1>
        <h1 id="title2">Reddit</h1>
      </div>
    </div>
  );
}
