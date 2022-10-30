import React, { useEffect, useRef, useState } from "react";
import { createNewSubreddit, showPosts, showSubs } from "../firebase";

export default function SubList ({Name}) {


    return (
        <div className="sub-nav-ist">
            <div className="sub-btns"id={Name}>{Name}</div>
        </div>
    )
}