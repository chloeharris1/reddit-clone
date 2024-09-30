import "./App.css";
import RedditApp from "./RedditApp";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RedditApp />} />
        <Route path="/r/:subredditName" element={<RedditApp />} />
        <Route path="/r/:subredditName/post/:postId" element={<RedditApp />} />
      </Routes>
    </div>
  );
}

export default App;
