import "./App.css";
import { SearchResults } from "./features/search/SearchResults";
import RedditApp from "./RedditApp";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Route to view a full post in a specific subreddit */}
        <Route
          path="/r/:subredditName/comments/:postId"
          element={<RedditApp />}
        />
        {/* Route to view posts in a specific subreddit */}
        <Route path="/r/:subredditName" element={<RedditApp />} />
        {/* Route to view search results */}
        <Route path="/search" element={<SearchResults />} />
        {/* Default route: load a subreddit */}
        <Route path="/" element={<RedditApp />} />
      </Routes>
    </div>
  );
}

export default App;
