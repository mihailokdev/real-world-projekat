import React from "react";
import { useRef, useState, useEffect } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { useLogin } from "../context/LoginProvider";
const LOGIN_URL = "/users/login";

function Login() {
  const { setIsLoggedIn } = useLogin();
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let user = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({ user }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: false,
      });
      console.log(JSON.stringify(response?.data));
      if (response.data.user.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        sessionStorage.setItem("JWT", JSON.stringify(response.data.user.token))
        sessionStorage.setItem("email", JSON.stringify(response.data.user.email));
        sessionStorage.setItem("username", JSON.stringify(response.data.user.username));

      };

      const token = response.data.user.token;

      setAuth({user, token})
      setIsLoggedIn(true);
      setEmail("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login failed");
      }
      errRef.current.focus();
    }
  };

  return (
      <>
          <div className="auth-page">
            <div className="container page">
              <div className="row">
                <div className="col-md-6 offset-md-3 col-xs-12">
                  <p
                    ref={errRef}
                    className={errMsg ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                  >
                    {errMsg}
                  </p>
                  <h1 className="text-xs-center">Sign in</h1>
                  <p className="text-xs-center">
                    <Link to="/register"> Need an account? </Link>
                  </p>
                  <form onSubmit={handleSubmit}>
                    <fieldset className="form-group">
                      <label htmlFor="Email" />
                      <input
                        id="Email"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Email"
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <label htmlFor="Password" />
                      <input
                        id="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="Password"
                      />
                    </fieldset>
                    <button className="btn btn-lg btn-primary pull-xs-right">
                      Sign in
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
      </>
  );
}


export default Login;
