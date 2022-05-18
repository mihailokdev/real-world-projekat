import React from "react";
import Header from "./layout/header";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import { Route, Routes, HashRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
