import React from "react";

export default function ShowPost(Title, Content, OP) {
  return (
    <div id="post-background">
      <h4>{Title}</h4>
      <p id="post-content">{Content}</p>
      <p>{OP}</p>
    </div>
  );
}
