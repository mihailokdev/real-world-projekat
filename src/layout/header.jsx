import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../context/LoginProvider";

function Header() {
  const { isLoggedIn, setIsLoggedIn } = useLogin();
  let JWT = null;
  JWT = sessionStorage.getItem("JWT");
  console.log(JWT);
  let username = sessionStorage.getItem("username");

  return isLoggedIn ? (
    <div>
      <div>
        <title>Conduit</title>
        <link
          href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
          rel="stylesheet"
          type="text/css"
        />
        <link rel="stylesheet" href="//demo.productionready.io/main.css" />
      </div>
      <div>
        <nav className="navbar navbar-light">
          <div className="container">
            <Link className="navbar-brand" to="/">
              conduit
            </Link>
            <ul className="nav navbar-nav pull-xs-right">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <p>
                  <Link to="/editor" className="nav-link ion-compose">
                    {" "}
                    New Article{" "}
                  </Link>
                </p>
              </li>
              <li className="nav-item">
                <Link to="/settings" className="nav-link">
                  <i className="ion-gear-a"></i>Settings
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/user" className="nav-link">
                  {username.slice(1, -1)}
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <footer>
          <div className="container">
            <a href="/" className="logo-font">
              conduit
            </a>
            <span className="attribution">
              An interactive learning project from{" "}
              <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
              licensed under MIT.
            </span>
          </div>
        </footer>
      </div>
    </div>
  ) : (
    <div>
      <div>
        <title>Conduit</title>
        <link
          href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
          rel="stylesheet"
          type="text/css"
        />
        <link rel="stylesheet" href="//demo.productionready.io/main.css" />
      </div>
      <div>
        <nav className="navbar navbar-light">
          <div className="container">
            <Link className="navbar-brand" to="/">
              conduit
            </Link>
            <ul className="nav navbar-nav pull-xs-right">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  {" "}
                  Sign in{" "}
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  {" "}
                  Sign up{" "}
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <footer>
          <div className="container">
            <a href="/" className="logo-font">
              conduit
            </a>
            <span className="attribution">
              An interactive learning project from{" "}
              <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
              licensed under MIT.
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Header;
