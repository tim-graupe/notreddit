import React, { useState } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
  getMetadata,
} from "firebase/storage";
import { addImg } from "../firebase";

export default function SubmitImage() {
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);
  const storage = getStorage();

  function handleChange(event) {
    setFile(event.target.files[0]);
  }
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
          console.log(url);
          addImg('beer', "Duck", url)
        });
      }
    );
  }


  return (
    <div>
      <input type="file" accept="" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
