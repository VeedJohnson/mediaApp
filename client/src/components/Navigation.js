import React, { createRef } from "react";
import { Link } from "react-router-dom";

function Navigation() {
  const collapse = createRef();
  const handleNav = () => {
    collapse.current.classList.toggle("show");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            onClick={() => {
              handleNav();
            }}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div ref={collapse} className="collapse show navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/main/posts"
                >
                  Posts
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/main/categories"
                >
                  Categories
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav justify-content-end">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/login"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
