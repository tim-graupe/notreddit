import React, {useEffect} from "react";
import Reply from "./postReply";

export default function ShowPost(props) {
    

  useEffect(() => {
    const checkPostOpen = () => {
      if (props.postOpen){
        document.getElementById('reply').style.display = 'block'
      } else {
        document.getElementById('reply').style.display = 'none'

      }
    }
    checkPostOpen()
  })
  return (
    <div id="post-background">
      <h1>{props.title}</h1>
      <p id="post-content">{props.content}</p>
      <p>{props.OP}</p>
      <div id="reply"><Reply postID={props.postID} currentSub = {props.currentSub} /></div>
      <div id="replies">
        {/* fix below so it will only render when not undefined, code otherwise works! */}

      {/* {props.replies.map((reply) => {
        return (
          <div id="comment">
          <p>{reply.reply}</p>
          <p>{reply.name}</p>
          </div>
        )
      })} */}
      </div>
    </div>

  );
}
