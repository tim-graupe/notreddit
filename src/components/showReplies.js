import React from "react";

export function ShowReplies(props) {
  if (props.replies) {
    return (
      <div id="replies">
        {props.replies.map((reply) => {
          return (
            <div id="comment">
              <p>{reply.name}</p>
              <div id="name">
                <img alt="profile pic" src={reply.pic} />
                <p>{reply.reply}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
}
