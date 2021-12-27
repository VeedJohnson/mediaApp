import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import Post from "./Post";
import PostDetail from "./PostDetail";
import NewPost from "./NewPost";
import CategoryPosts from "./CategoryPosts";
import EditPost from "./EditPost";

export default function LeftComponent(props) {
  const { post, error, loading, show, updatePosts } = props;
  return (
    <>
      <Route
        exact
        path="/main/posts"
        render={(routerProps) => (
          <Post
            post={post}
            error={error}
            loading={loading}
            show={show}
            updatePosts={updatePosts}
            {...routerProps}
          />
        )}
      />

      {/* <Route
        exact
        path="/main/posts/edit"
        render={(routerProps) => <EditPost post={post} {...routerProps} />}
      /> */}

      <Route exact path="/main/posts/:id" component={PostDetail} />
      <Route exact path="/main/new/post" component={NewPost} />
      <Route exact path="/main/posts/edit/:id" component={EditPost} />
      <Route exact path="/main/categories/:id" component={CategoryPosts} />
    </>
  );
}
