import TopNav from "./components/topNav";
import "./App.css";
import CurrentSubPosts from "./components/currentSubPosts";
import { useEffect, useState } from "react";
import { db, showPosts } from "./firebase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import SubList from "./components/showSubList";
import ShowPost from "./components/showPost";

function App(props) {
  const [posts, setPosts] = useState([]);
  const [currentSub, setCurrentSub] = useState("dogs");
  const [subList, setSubList] = useState([]);


  //useeffect is causing the excessive reads
  // useEffect(() => {
  //   const getPosts = async () => {
  //     const subRef = doc(db, "subreddits", currentSub);
  //     const sub = await getDoc(subRef);
  //     setPosts(sub.data().Posts);
  //     posts.push(sub.data().Posts);
  //   };
  //   getPosts();
  // }, []);

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
  }, []);
  
  function changeSub(sub){
    setCurrentSub(sub)
  }

  // getPosts()

  return (
    <div className="App">
      {subList.map((sub) => {
        return (
          <div className="sub-btns" onClick={() => {
            changeSub(sub)
          }} key={sub}>{sub}</div>
        )
      })}

      <TopNav  subs={subList}/>
      
      <CurrentSubPosts subs={subList} currentSub={currentSub} />
      </div>
  );
}

export default App;
