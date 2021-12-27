import React from "react";
import LatestPost from "./LatestPost";
import TrendingCategories from "./TrendingCategories";

export default function RightComponent(props) {
  const { post, error, loading, show } = props;

  return (
    <>
      <LatestPost post={post} error={error} loading={loading} show={show} />

      <TrendingCategories />
    </>
  );
}
