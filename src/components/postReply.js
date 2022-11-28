import React, { useState } from "react";
import {leaveComment } from "../firebase";
import TextField from '@mui/material/Button';

export default function Reply(props) { 
    const [newReply, setNewReply] = useState({
        Content: "",

    })
    

    const handleChange = (e) => {
        setNewReply({...newReply, [e.target.name]: e.target.value});
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        leaveComment(props.currentSub, props.postID, newReply.Content)
        // setNewReply({Content: ""})
    }

    
  return(
    <div id="submit-form">
    <form onSubmit={handleSubmit}>
        <input type="text" id="Content" name="Content" onChange={handleChange} />
        <input type="submit" value="Reply" />
        </form>
    </div>

  ) 
 }