import React, { useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import PostCard from "./reusable/PostCard";

export default function PostDetail(props) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/post/" + props.match.params.id)
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
                <PostCard {...post} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
