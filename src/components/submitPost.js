import React, { useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { getStorage } from "firebase/storage";
import { submitNewPost, storage } from "../firebase";
export default function SubmissionModal(props) {
    const [newPost, setNewPost] = useState({
        Title: "",
        Content: "",
        Sub: ""
    })
    

    const handleChange = (e) => {
        setNewPost({...newPost, [e.target.name]: e.target.value});
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        submitNewPost(newPost.Sub, newPost.Title, newPost.Content)
        setNewPost({Title: "", Content: "", Sub: ""})
    }

    
  return(
    <div id="submit-form">
    <form onSubmit={handleSubmit}>
        <label>Title: </label>
        <input type="text" name="Title" value={newPost.Title} onChange={handleChange} />

        <label>Content: </label>
        <input type="text" name="Content" value={newPost.Content} onChange={handleChange} />

        <label>Sub:</label>
        <input type="text" name="Sub" value={newPost.Sub} onChange={handleChange} />
        <input type="submit" value="Submit" />
        </form>
    </div>

  ) 
}
