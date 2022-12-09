import React, { useState } from "react";
import { submitNewPost } from "../firebase";
export default function SubmissionModal(props) {
  const [newPost, setNewPost] = useState({
    Sub: "",
    Title: "",
    Content: "",
  });

  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newPost.Sub, newPost.Title, newPost.Content);
    submitNewPost(newPost.Sub, newPost.Title, newPost.Content);
    setNewPost({ Title: "", Content: "", Sub: "" });
  };

  return (
    <div onSubmit={handleSubmit}>
      <p>
        You are submitting a text-based post. Speak your mind. A title is
        required, but expanding further in the text field is not. Beginning your
        title with "vote up if" is violation of intergalactic law.
      </p>
      <label>Title*: </label>
      <input
        type="text"
        name="Title"
        value={newPost.Title}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      <div onSubmit={handleSubmit}>
        <textarea
          onSubmit={handleSubmit}
          onChange={handleChange}
          value={newPost.Content}
          id="Content"
          name="Content"
          type="submit"
          rows="4"
          cols="50"
        />
      </div>
      <label>Sub:</label>
      <input
        type="text"
        name="Sub"
        value={newPost.Sub}
        onChange={handleChange}
      />
      <input type="submit" value="Submit" onSubmit={handleSubmit} />
    </div>
  );
}
