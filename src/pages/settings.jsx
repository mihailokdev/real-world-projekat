import React from "react";
import { useLogin } from "../context/LoginProvider";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

function Settings() {
  const { setIsLoggedIn } = useLogin();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"
  let username = sessionStorage.getItem("username");
  let email = sessionStorage.getItem("email");


  return (
    <>
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>

              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="URL of profile picture"
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Your Name"
                      value={username.slice(1, -1)}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      rows="8"
                      placeholder="Short bio about you"
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Email"
                      value={email.slice(1, -1)}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                    />
                  </fieldset>
                  <button className="btn btn-lg btn-primary pull-xs-right">
                    Update Settings
                  </button>
                </fieldset>
              </form>
              <hr />
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setAuth({});
                  navigate(from, { replace: true })
                }}
                className="btn btn-outline-danger"
              >
                {" "}
                Or click here to logout{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
