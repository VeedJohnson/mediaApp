import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";

import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./components/Main";

function App() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/post")
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

  return (
    <div id="main">
      <Navigation />
      <div className="mt-4 container">
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="/main" component={Main} />
      </div>
    </div>
  );
}

export default App;
