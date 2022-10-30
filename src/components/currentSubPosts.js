import React, { useEffect, useRef, useState } from "react";
import { createNewSubreddit, showPosts, showSubs } from "../firebase";

export default function CurrentSubPosts({ Title, Content, OP, Votes }) {
  return (
    <div className="content">
      <h1>{Title}</h1>
      <p>{Content}</p>
      <p>Submitted by: {OP}</p>
      <p>{Votes}</p>
    </div>
  );
}
