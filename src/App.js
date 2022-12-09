import TopNav from "./components/topNav";
import CurrentSubPosts from "./components/currentSubPosts";
import { useEffect, useState } from "react";
import { db, signIn, signOutUser } from "./firebase";
import { collection, getDocs } from "firebase/firestore";


function App(props) {
  const [currentSub, setCurrentSub] = useState("beer");
  const [subList, setSubList] = useState([]);
  const [login, setLogin] = useState(false);


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
            <button
        id="signIn-btn"
        onClick={() => {
          setLogin(true);

          signIn();
        }}
      >
        Google
      </button>
      <button id="signOut-btn"
        onClick={() => {
          signOutUser();
          setLogin(false);
        }}
      >
        Sign Out
      </button>
      <TopNav subs={subList} />
      <div id="sub">
      <CurrentSubPosts subs={subList} currentSub={currentSub} />
      </div>
    </div>
  );
}

export default App;
