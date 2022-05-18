import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";
const LOGIN_URL = '/users/login';

function Login() {

  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({email, pwd}),
      {
        headers: {'Content-Type': 'application.json'},
      }
      );
      setEmail('');
    setPwd('');
    setSuccess(true);
    } catch (err) {

    }

  }

  return (
    <div>
      <div class="auth-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center">Sign in</h1>
              <p class="text-xs-center">
              <Link to="/register" > Need an account? </Link>
              </p>
              <form onSubmit={handleSubmit}>
                <fieldset class="form-group">
                  <label htmlFor="Email" />
                  <input
                    id="Email"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    class="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <label htmlFor="Password"/>
                  <input
                    id="Password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    class="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                  />
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right">
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
