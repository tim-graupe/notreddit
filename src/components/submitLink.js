import React, { useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { getStorage } from "firebase/storage";
import { storage, addLink } from "../firebase";


export default function SubmitLink(props) {
    const [newLink, setNewLink] = useState({
        Title: "",
        Link: "",
        Sub: ""
    })


    const handleChange = (e) => {
        setNewLink({...newLink, [e.target.name]: e.target.value});
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        addLink(newLink.Sub, newLink.Title, newLink.Link)
        setNewLink({Title: "", Link: "", Sub: ""})
    }

    
  return(

    <div>

    </div>

  ) 
}
