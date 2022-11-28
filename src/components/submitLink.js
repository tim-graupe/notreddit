import React, { useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { getStorage } from "firebase/storage";
import { submitNewPost, storage } from "../firebase";
export default function SubmissionModal(props) {
    const [newPost, setNewPost] = useState({
        Title: "",
        Link: "",
        Sub: ""
    })
    

    const handleChange = (e) => {
        setNewPost({...newPost, [e.target.name]: e.target.value});
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        submitNewPost(newPost.Sub, newPost.Title, newPost.Link)
        setNewPost({Title: "", Link: "", Sub: ""})
    }

    
  return(
    <div id="submit-form">
    <form onSubmit={handleSubmit}>
        <label>Title: </label>
        <input type="text" name="Title" value={newPost.Title} onChange={handleChange} />

        <label>Link: </label>
        <input type="text" name="Link" value={newPost.Link} onChange={handleChange} />

        <label>Sub:</label>
        <input type="text" name="Sub" value={newPost.Sub} onChange={handleChange} />
        <input type="submit" value="Submit" />
        </form>
    </div>

  ) 
}
