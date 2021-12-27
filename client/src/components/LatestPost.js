import React from "react";
import { Link } from "react-router-dom";

export default function LatestPost(props) {
  const { posts, error, loading, show } = props;

  return (
    <>
      <div className="card p-2 bg-light">
        <h4>Latest Post</h4>
        <ul className="list-group">
          {posts?.slice(0, 3).map((post) => {
            return (
              <>
                <li className="list-group-item">
                  <Link to={"/posts/" + post._id}>{post.title}</Link>
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
}
