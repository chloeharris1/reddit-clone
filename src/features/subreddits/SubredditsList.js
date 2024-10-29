import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSubredditsList, selectSubreddits } from "./subredditsSlice"; // Import the thunk
import { NavLink } from "react-router-dom";
import { subredditCategories } from "../../utils/categories";
import { setCurrentSubreddit } from "./subredditsSlice";
import { FingerprintSimple } from "@phosphor-icons/react";
import { useMediaQuery } from "react-responsive";

export const SubredditsList = ({ isMenuOpen, toggleMenu }) => {
  const dispatch = useDispatch();
  const subreddits = useSelector(selectSubreddits);
  const status = useSelector((state) => state.subreddits.status);
  const error = useSelector((state) => state.subreddits.error);

  // Detect screen size
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isDesktop = useMediaQuery({ query: "(min-width: 992px)" });

  // Fetch subreddits list on component mount
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSubredditsList());
    }
  }, [status, dispatch]);

  // Map over categories and filter the dynamic subreddit data to match each category
  const renderSubredditCategories = () => {
    return Object.entries(subredditCategories).map(
      ([category, subredditList]) => (
        <div key={category} className="subreddit-category">
          <h4 className="category">{category}</h4>
          <ul>
            {subredditList.map((subredditName) => {
              const subreddit = subreddits.find(
                (sub) => sub.name === subredditName
              );

              return (
                subreddit && (
                  <li
                    key={subreddit.name}
                    alt={subreddit.name}
                    className="subreddit-name"
                  >
                    <NavLink
                      to={`/r/${subreddit.name}`}
                      className={({ isActive }) =>
                        isActive ? "active-subreddit" : ""
                      }
                      onClick={() => {
                        dispatch(setCurrentSubreddit(subreddit.name));
                        if (isMobile || isTablet) toggleMenu();
                      }}
                    >
                      <FingerprintSimple size={28} color="#e0e0e0" />
                      <p>{subreddit.name}</p>
                    </NavLink>
                  </li>
                )
              );
            })}
          </ul>
          <hr></hr>
        </div>
      )
    );
  };

  if (status === "loading") {
    return <p>Loading subreddits...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="subreddits-list">
      {isTablet && (
        <div className="tablet-view">{renderSubredditCategories()}</div>
      )}
      {isDesktop && (
        <div className="desktop-view">{renderSubredditCategories()}</div>
      )}

      {isMobile && (
        <div className="mobile-view">
          {isMenuOpen && (
            <div className="mobile-menu">{renderSubredditCategories()}</div>
          )}
        </div>
      )}
      <div className="creator">Made with ❤️ by Chloe</div>
    </div>
  );
};

export default SubredditsList;
