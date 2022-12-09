import React, { useState } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import { addImg } from "../firebase";

export default function SubmitImage(props) {
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("")
  const [percent, setPercent] = useState(0);
  const storage = getStorage();

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function handleTitle(e){
    setTitle({ ...title, [e.target.name]: e.target.value });
  };
  function handleUpload() {
    if (!file) {
      alert("Please select an image first");
    }
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setPercent(percent);
        console.log(percent)
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          addImg(props.currentSub, Object.values(title), url)
        });
      }
    );
  }


  return (
    <div>
      <p>You are submitting a link. The key to a successful submission is interesting content and a descriptive title.</p>
      Title <input type="text" onChange={handleTitle} />
      <input type="file" accept="" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
