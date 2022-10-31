import TopNav from "./components/topNav";
import "./App.css";
import CurrentSubPosts from "./components/currentSubPosts";
import { useEffect, useState } from "react";
import { db, showPosts } from "./firebase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import SubList from "./components/showSubList";
import ShowPost from "./components/showPost";

function App() {
  const [posts, setPosts] = useState([]);
  const [currentSub, setCurrentSub] = useState("dogs");
  const [subList, setSubList] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const subRef = doc(db, "subreddits", currentSub);
      const sub = await getDoc(subRef);
      setPosts(sub.data().Posts);
      posts.push(sub.data().Posts);
    };
    getPosts();
  }, [posts]);

  useEffect(() => {
    let newArr = [];
    const showSubs = async () => {
      const querySnapshot = await getDocs(collection(db, "subreddits"));
      querySnapshot.forEach((doc) => {
        newArr.push(doc.id);
      });
      setSubList(newArr);
    };
    showSubs();
  }, [subList]);

  return (
    <div className="App">
      <div id="sub-nav">
        {subList.map((sub) => {
          return (
            <div id={sub.id} onClick={() => setCurrentSub(sub)}>
              <SubList Name={sub} />
            </div>
          );
        })}
      </div>
      <TopNav />
      {posts.map((post) => {
        return (
          <div
            key={post.Title}
            onClick={() => (
              console.log(post),
              <ShowPost
                Title={post.Title}
                Content={post.Content}
                OP={post.OP}
                Votes={post.Votes}
              />
            )}
          >
            <CurrentSubPosts
              Title={post.Title}
              OP={post.OP}
              Votes={post.Votes}
            />
          </div>
        );
      })}
    </div>
  );
}

export default App;
