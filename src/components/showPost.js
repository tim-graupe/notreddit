import React, { useEffect, useState } from "react";
import Reply from "./postReply";
import { ShowReplies } from "./showReplies";

export default function ShowPost(props) {
  useEffect(() => {
    const checkPostOpen = () => {
      if (props.postOpen) {
        document.getElementById("reply").style.display = "block";
      } else {
        document.getElementById("reply").style.display = "none";
      }
    };
    checkPostOpen();
  });
  return (
    <div id="post-background">
      <h1>{props.title}</h1>
      {props.Type === "Image" ? <img src={props.content} alt="post" /> : <p>{props.content}</p>}

      <p>{props.OP}</p>
      <div id="reply">
        <Reply postID={props.postID} currentSub={props.currentSub} />
      </div>
        {/* fix below so it will only render when not undefined, code otherwise works! */}
        <ShowReplies replies = {props.replies}/>
      </div>
  )
}
