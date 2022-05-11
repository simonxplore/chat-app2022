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
import { ThemeProvider, Navbar, Nav, Container } from "react-bootstrap";
import logo from "./img/datch.svg";
/*
  
import Container from "react-bootstrap/Container";
import { fontSize } from "@mui/system";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
  
  */
document.body.style = "background: #FFFFF9";

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
        <ThemeProvider
          breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        >
          <div className="app" style={{ backgroundColor: "#FFFFF9" }}>
            <Navbar bg="transparent" expand="lg">
              {!this.state.user && (
                <Container style={{}}>
                  <Navbar.Brand href="/">
                    <img
                      src={logo}
                      width="30"
                      height="30"
                      className="d-inline-block align-top"
                      alt=""
                      style={{ width: "70%" }}
                    />
                  </Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse
                    id="basic-navbar-nav"
                    style={{}}
                    className="justify.content.right flex-row-reverse"
                  >
                    <Nav className="">
                      <Nav.Link
                        href="/login"
                        className="link-success"
                        style={{ textDecoration: "none", fontSize: "1.2em" }}
                      >
                        <p className="pages-navbar">Login</p>
                      </Nav.Link>
                      <Link
                        className="login-btn text-success"
                        to="/register"
                      ></Link>
                      <Nav.Link
                        href="/register"
                        className="link-success"
                        style={{ textDecoration: "none", fontSize: "1.2em" }}
                      >
                        <p className="pages-navbar">Register</p>
                      </Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              )}

              {this.state.user && (
                <Container>
                  <Navbar.Brand href="#">
                    <img
                      src={logo}
                      width="30"
                      height="30"
                      className="d-inline-block align-top"
                      alt=""
                      style={{ width: "70%" }}
                    />
                  </Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav flex-row-reverse">
                    <Nav className="">
                      <Nav.Link
                        href="#"
                        onClick={this.logOutUser}
                        className="link-success"
                        style={{ textDecoration: "none", fontSize: "1.2em" }}
                      >
                        Log Out
                      </Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              )}
            </Navbar>
            <div className="d-flex justify-content-center" style={{}}>
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
          </div>
        </ThemeProvider>
        ;
      </Router>
    );
  }
}

ReactDOM.render(<AppRouter />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
