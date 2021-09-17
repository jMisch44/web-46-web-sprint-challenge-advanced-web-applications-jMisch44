import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";

import Login from "./components/Login";
import "./styles.scss";
import axiosWithAuth from "./helpers/axiosWithAuth";

function App() {
  const handleLogout = () => {
    axiosWithAuth()
      .post(`http://localhost:5000/api/logout`)
      .then((res) => {
        localStorage.removeItem("token");
        window.location.href = "http://localhost:3000/login";
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <a data-testid="logoutButton" href="#" onClick={handleLogout}>
            logout
          </a>
        </header>
        <Switch>
          <PrivateRoute path="/bubbles" component={BubblePage} />
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Add in two routes that link to the Login Component, one for the default path '/' and one for the '/login'.
//2. Render BubblePage as a PrivateRoute
//2. Build the logout button to call the logout endpoint, remove the localStorage Item and redirect to the login page.