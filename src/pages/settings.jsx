import React, { useState, useEffect, useRef } from "react";
import { useLogin } from "../context/LoginProvider";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const CHANGE_USER_URL = "/user";

function Settings() {
  const userRef = useRef();
  const errRef = useRef();

  const [username2, setUsername2] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [mail, setMail] = useState("");
  const [mailFocus, setMailFocus] = useState(false);

  const [bio, setBio] = useState("");
  const [bioFocus, setBioFocus] = useState(false);

  const [img, setImg] = useState("");
  const [imgFocus, setImgFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const { setIsLoggedIn } = useLogin();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  let initialUsername = sessionStorage.getItem("username");
  let email = sessionStorage.getItem("email");
  let JWT = sessionStorage.getItem("JWT");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(username2));
  }, [username2]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  useEffect(() => {
    setErrMsg("");
  }, [username2, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(username2);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    let user = {
      email: mail,
      token: JWT.slice(1, -1),
      username: username2,
      bio: bio,
      image: img,
    };

    try {
      const response = await axios.post(
        CHANGE_USER_URL,
        JSON.stringify({ user }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data);
      console.log(response.data.user.token);
      console.log(JSON.stringify(response));
      if (response.data.user.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username taken");
      } else if (err.response?.status === 409) {
        setErrMsg("Alo majmune 401 nisi nesto dobro poslao");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>

              <form onSubmit={handleSubmit}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="URL of profile picture"
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <label htmlFor="Name">
                      <span className={validName ? "valid" : "hide"}>
                        {" "}
                        Username is valid{" "}
                      </span>
                      <span
                        className={validName || !username2 ? "hide" : "invalid"}
                      >
                        {" "}
                        Username is invalid{" "}
                      </span>
                    </label>
                    <input
                      id="Name"
                      ref={userRef}
                      autoComplete="off"
                      onChange={(e) => setUsername2(e.target.value)}
                      aria-invalid={validName ? "false" : "true"}
                      aria-describedby="uidnote"
                      onFocus={() => setUserFocus(true)}
                      onBlur={() => setUserFocus(false)}
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Your Name"
                      defaultValue={initialUsername.slice(1, -1)}
                    />
                    <p
                      id="uidnote"
                      className={
                        userFocus && username2 && !validName
                          ? "instructions"
                          : "offscreen"
                      }
                    >
                      4 to 24 characters. <br />
                      Must begin with letter. <br />
                      Letters, numbers, underscores, hyphens allowed.
                    </p>
                  </fieldset>
                  <fieldset className="form-group">
                    <label htmlFor="bio"></label>
                    <textarea
                      id="bio"
                      autoComplete="off"
                      onChange={(e) => setBio(e.target.value)}
                      onFocus={() => setBioFocus(true)}
                      onBlur={() => setBioFocus(false)}
                      className="form-control form-control-lg"
                      rows="8"
                      placeholder="Short bio about you"
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <label htmlFor="Email" />
                    <input
                      id="Email"
                      autoComplete="off"
                      onChange={(e) => setMail(e.target.value)}
                      onFocus={() => setMailFocus(true)}
                      onBlur={() => setMailFocus(false)}
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Email"
                      defaultValue={email.slice(1, -1)}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <label htmlFor="Password">
                      <span className={validPwd ? "valid" : "hide"}>
                        Password is valid
                      </span>
                      <span className={validPwd || !pwd ? "hide" : "invalid"}>
                        Password is invalid
                      </span>
                    </label>
                    <input
                      id="Password"
                      onChange={(e) => setPwd(e.target.value)}
                      aria-invalid={validPwd ? "false" : "true"}
                      aria-describedby="pwdnote"
                      onFocus={() => setPwdFocus(true)}
                      onBlur={() => setPwdFocus(false)}
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                    />
                    <p
                      id="pwdnote"
                      className={
                        pwdFocus && !validPwd ? "instructions" : "offscreen"
                      }
                    >
                      8 to 24 characters. <br />
                      Must include uppercase and lowercase letters, a number and
                      a special character. <br />
                      Letters, numbers, underscores, hyphens allowed.
                    </p>
                  </fieldset>
                  <button className="btn btn-lg btn-primary pull-xs-right" on>
                    Update Settings
                  </button>
                </fieldset>
              </form>
              <hr />
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setAuth({});
                  navigate(from, { replace: true });
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
