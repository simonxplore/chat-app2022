import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import firebase, { auth } from "./firebase.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { fontSize } from "@mui/system";

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
  }
  logOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then((window.location = "/"));
  };
  render() {
    return (
      <Router>
        <div className="app">
          <nav className="main-nav">
            {!this.state.user && (
              <div>
                <Link
                  to="/"
                  className="link-success"
                  style={{ textDecoration: "none", fontSize: "1.2em" }}
                >
                  Home
                </Link>
                <Link
                  to="/login"
                  className="link-success"
                  style={{ textDecoration: "none", fontSize: "1.2em" }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="link-success"
                  style={{ textDecoration: "none", fontSize: "1.2em" }}
                >
                  Register
                </Link>
              </div>
            )}
            {this.state.user && (
              <a
                href="#!"
                onClick={this.logOutUser}
                className="text-success"
                style={{
                  textDecoration: "none",
                  fontSize: "1.2em",
                }}
              >
                Log Out
              </a>
            )}
          </nav>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <App user={this.state.user} />}
            />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
          </Switch>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<AppRouter />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
