import React from "react";
import Header from "./layout/header";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import { Route, Routes, HashRouter as Router } from "react-router-dom";
import CreateArticle from "./pages/createArticle";
import RequireAuth from "./requireAuth";
import { AuthProvider } from "./context/AuthProvider";
import CurrentUser from "./pages/currentUser";
import PersistLogin from "./components/persistLogin";
import { UserContext } from "./components/userContext";
import LoginProvider from "./context/LoginProvider";
import Settings from "./pages/settings";

function App() {
  return (
    <LoginProvider>
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<RequireAuth />}>
              <Route path="/editor" element={<CreateArticle />} />
              <Route path="/user" element={<CurrentUser />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </LoginProvider>
  );
}

export default App;
