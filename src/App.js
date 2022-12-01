import TopNav from "./components/topNav";
import "./App.css";
import CurrentSubPosts from "./components/currentSubPosts";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

function App(props) {
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
            key={sub}
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
