import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function TrendingCategories() {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [show, setShow] = useState(false);
  const [catPosts, setCatPosts] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/category")
      .then(({ data }) => {
        setCategory(data?.data);
        setLoading(!loading);
      })
      .catch(({ response }) => {
        setErr(response?.data);
        setShow(!show);
      });
  }, []);

  console.log(category);
  // const request = axios
  //   .get("http://localhost:5000/api/category")
  //   .then(({ data }) => {
  //     console.log(data);
  //     setCategory(data?.data);
  //     setLoading(!loading);
  //   })
  //   .catch(({ response }) => {
  //     setErr(response?.data);
  //     setShow(!show);
  //   });

  return (
    <>
      <div className="card p-2 bg-light mt-4">
        <h4>Trending categories</h4>
        <ol className="list-group list-group-numbered">
          {category?.map((data) => {
            return (
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">
                    <Link to={"/main/categories/" + data._id}>
                      {data.title}
                    </Link>
                  </div>
                </div>
                {/* <span className="badge bg-primary rounded-pill">14</span> */}
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}
