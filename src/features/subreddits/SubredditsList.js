import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSubredditsList, selectSubreddits } from "./subredditsSlice"; // Import the thunk
import { NavLink } from "react-router-dom";
import { subredditCategories } from "../../utils/categories";
import { subredditImg } from "../../utils/utils";
import { setCurrentSubreddit } from "./subredditsSlice";

export const SubredditsList = () => {
  const dispatch = useDispatch();
  const subreddits = useSelector(selectSubreddits);
  const status = useSelector((state) => state.subreddits.status);
  const error = useSelector((state) => state.subreddits.error);

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
          <h4>{category}</h4>
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
                      onClick={() =>
                        dispatch(setCurrentSubreddit(subreddit.name))
                      }
                    >
                      <img
                        src={subredditImg || subreddit.image}
                        alt="subreddit-icon"
                        className="subreddit-icon"
                      />
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
      {/* <h2>Subreddits</h2> */}
      {renderSubredditCategories()}
    </div>
  );
};

export default SubredditsList;
