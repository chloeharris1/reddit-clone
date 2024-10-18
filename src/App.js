import "./App.css";
import { Route, Routes } from "react-router-dom";
import CurrentPost from "./features/currentPost/CurrentPost";
import { SearchResults } from "./features/search/SearchResults";
import SubredditsList from "./features/subreddits/SubredditsList";
import PostsList from "./features/posts/PostsList";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <Header />
        <div className="sidebar">
          <SubredditsList />
        </div>
        <div className="main-content">
          <Routes>
            {/* Route to view a full post */}
            <Route
              path="/r/:subreddit/comments/:postId"
              element={<CurrentPost />}
            />
            {/* Route to view posts in a specific subreddit */}
            <Route path="/r/:subreddit" element={<PostsList />} />
            {/* Route to view search results */}
            <Route path="/search" element={<SearchResults />} />
            {/* Default route: display posts for a default subreddit */}
            <Route path="/" element={<PostsList />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
