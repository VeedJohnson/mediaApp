import React from "react";
import { Link } from "react-router-dom";

export default function PostCard({
  category,
  user,
  title,
  image,
  createdAt,
  updatedAt,
  _id,
  description,
}) {
  let id = _id;
  return (
    <div key={_id} className="container card bg-light mb-3">
      <h4 className="display-4">
        <Link to={"/main/posts/" + _id}>{title}</Link>
      </h4>
      <div>{user?.username}</div>
      <div className="d-flex">
        <span className="badge bg-light text-dark p-1">{category?.title}</span>
      </div>
      <div
        style={{
          width: "100%",
          height: "450px",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "top center",
          backgroundColor: "rgb(0 0 0 / 88%)",
          borderRadius: "5px",
          backgroundImage: `url('http://localhost:5000/${image}')`,
        }}
      ></div>
      <div className="row mt-2 mb-2">
        <div className="col-4 text-center">
          <div className="card w-100">❤</div>
        </div>
        <div className="col-4 text-center">
          <div className="card w-100">🗨</div>
        </div>
        <div className="col-4 text-center">
          <div className="card w-100">🔥</div>
        </div>
      </div>
      <div className="row mt-2 mb-2">
        <div className="col-4 offset-4 text-center">
          <Link className="btn btn-primary" to={`/main/posts/edit/${id}`}>
            Edit Post
          </Link>
        </div>
      </div>
    </div>
  );
}
