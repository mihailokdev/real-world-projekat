import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import { Link, Navigate, Redirect } from "react-router-dom";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";
const LOGIN_URL = "/users/login";

function Login() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

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

      setEmail("");
      setPassword("");
      setSuccess(true);
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
    <div>
      <>
        {success ? (
          <Navigate to="/" />
        ) : (
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
        )}
      </>
    </div>
  );
}

export default Login;
