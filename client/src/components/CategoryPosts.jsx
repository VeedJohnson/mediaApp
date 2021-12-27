import React, { useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import PostCard from "./reusable/PostCard";

export default function CategoryPosts(props) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/category/posts/" + props.match.params.id)
      .then(({ data }) => {
        console.log(data);
        setPost(data?.data);
        setLoading(!loading);
      })
      .catch(({ response }) => {
        setErr(response?.data);
        setShow(!show);
      });
  }, []);
  console.log(post);

  //   const [
  //     {
  //       category: { title },
  //     },
  //   ] = post;
  //   console.log(title);
  return (
    <div>
      {err && show ? (
        <Alert variant="danger" onClose={() => setShow(!show)}>
          <Alert.Heading>Oh Snap! You got an error</Alert.Heading>
          <p>Check and fix your error 😊</p>
        </Alert>
      ) : (
        <>
          {loading ? (
            <Spinner animation="grow" />
          ) : (
            <div>
              <div className="container">
                {/* <h1 className="d-1">All Posts from {title}</h1> */}
                {post?.map((data) => {
                  return <PostCard {...data} key={data._id} />;
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
