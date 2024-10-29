import "./App.css";
import { Route, Routes } from "react-router-dom";
import CurrentPost from "./features/currentPost/CurrentPost";
import { SearchResults } from "./features/search/SearchResults";
import SubredditsList from "./features/subreddits/SubredditsList";
import PostsList from "./features/posts/PostsList";
import { Header } from "./components/Header";
import { useState } from "react";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    console.log("Menu Clicked");
  };
  return (
    <div className="App">
      <div className="app-container">
        <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
        {isMenuOpen && <div className="overlay" onClick={toggleMenu} />}
        <div className={`sidebar ${isMenuOpen ? "open" : "closed"}`}>
          <SubredditsList isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>
        <div className="main-content">
          <Routes>
            <Route
              path="/r/:subreddit/comments/:postId"
              element={<CurrentPost />}
            />
            <Route path="/r/:subreddit" element={<PostsList />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/" element={<PostsList />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
