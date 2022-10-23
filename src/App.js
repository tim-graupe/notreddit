import TopNav from './components/topNav';
import './App.css';
import RenderPosts from './components/renderPosts';
import NewPost from './functions/newPost';

function App() {
  return (
    <div className="App">
      <TopNav />
      {/* <NewPost /> */}
      <RenderPosts/>
    </div>
  );
}

export default App;
