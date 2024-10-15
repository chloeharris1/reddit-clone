import "./App.css";
// import { SearchResults } from "./features/search/SearchResults";
import RedditApp from "./RedditApp";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Route to view a full post in a specific subreddit */}
        <Route path="/r/:subreddit/comments/:postId" element={<RedditApp />} />
        {/* Route to view posts in a specific subreddit */}
        <Route path="/r/:subreddit" element={<RedditApp />} />
        {/* Route to view search results */}
        {/* <Route path="/search" element={<SearchResults />} /> */}
        <Route path="/search/:postId" element={<RedditApp />} />{" "}
        {/* New route */}
        <Route path="/search" element={<RedditApp />} />
        {/* Default route: load a subreddit */}
        <Route path="/" element={<RedditApp />} />
      </Routes>
    </div>
  );
}

export default App;
