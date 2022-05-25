import React from "react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/users";

function Register() {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [mail, setMail] = useState("");
  const [mailFocus, setMailFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  useEffect(() => {
    setErrMsg("");
  }, [username, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    let user = {
      username: username,
      email: mail,
      password: pwd,
    };

    try {
      const response = await axios.post(REGISTER_URL,
        JSON.stringify({user}),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log(response.data);
      console.log(response.data.user.token);
      console.log(JSON.stringify(response));
      setSuccess(true);
      if (response.data.user.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      };
    } catch(err) {
      if(!err?.response) {
        setErrMsg("No server response");
      } else if(err.response?.status === 409 ) {
        setErrMsg("Username taken")
      } else {
        setErrMsg("Registration Failed")
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <div className="successScreen">
          <h1> You have successfully registered </h1>
          <p>
            <Link to="/login"> Sign in </Link>
          </p>
        </div>
      ) : (
        <div>
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
                  <h1 className="text-xs-center">Sign up</h1>
                  <p className="text-xs-center">
                    <Link to="/login" className="text-xs-center">
                      Have an account?
                    </Link>
                  </p>
                  <form onSubmit={handleSubmit}>
                    <fieldset className="form-group">
                      <label htmlFor="Name">
                        <span className={validName ? "valid" : "hide"}>
                          {" "}
                          Username is valid{" "}
                        </span>
                        <span
                          className={validName || !username ? "hide" : "invalid"}
                        >
                          {" "}
                          Username is invalid{" "}
                        </span>
                      </label>
                      <input
                        id="Name"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Username"
                      />
                      <p
                        id="uidnote"
                        className={
                          userFocus && username && !validName
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
                      <label htmlFor="Email" />
                      <input
                        id="Email"
                        autoComplete="off"
                        onChange={(e) => setMail(e.target.value)}
                        required
                        onFocus={() => setMailFocus(true)}
                        onBlur={() => setMailFocus(false)}
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Email"
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
                        required
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
                        Must include uppercase and lowercase letters, a number
                        and a special character. <br />
                        Letters, numbers, underscores, hyphens allowed.
                      </p>
                    </fieldset>
                    <button
                      disabled={!validName || !validPwd ? true : false}
                      className="btn btn-lg btn-primary pull-xs-right"
                    >
                      Sign up
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Register;
