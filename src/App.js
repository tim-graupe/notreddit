import TopNav from "./components/topNav";
import "./App.css";
import CurrentSubPosts from "./components/currentSubPosts";
import { useEffect, useState } from "react";
import { db, showPosts, leaveComment } from "./firebase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import SubList from "./components/showSubList";
import ShowPost from "./components/showPost";

function App(props) {
  const [posts, setPosts] = useState([]);
  const [currentSub, setCurrentSub] = useState("pizza");
  const [subList, setSubList] = useState([]);

  useEffect(() => {
    let newArr = [];
    const showSubs = async () => {
      const querySnapshot = await getDocs(collection(db, "subreddits"));
      querySnapshot.forEach((doc) => {
        newArr.push(doc.data().sub);
      });
      setSubList(newArr);
    };
    showSubs();
  }, []);

  function changeSub(sub) {
    setCurrentSub(sub);
  }

  // getPosts()

  return (
    <div className="App">
      {subList.map((sub) => {
        return (
          <div
            key={sub.id}
            className="sub-btns"
            onClick={() => {
              changeSub(sub);
            }}
          >
            {sub}
          </div>
        );
      })}

      <TopNav subs={subList} />

      <CurrentSubPosts subs={subList} currentSub={currentSub} />
    </div>
  );
}

export default App;
