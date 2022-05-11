import React from "react";
import firebase from "../firebase.js";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Form } from "react-bootstrap";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: null,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.history.push("/");
      })

      .catch((error) => {
        this.setState({ error });
      });
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <div className="auth-container">
        <Container fluid="md" className="p-5 p-md-0">
          <Row className="align-items-center ">
            <Col
              lg={true}
              style={{
                margin: "2em auto",
                backgroundColor: "#fffff",
              }}
              className="shadow p-3 mb-5 bg-white rounded"
            >
              <div>
                <h1
                  className="text-success text-lg-start text-center"
                  style={{
                    fontSize: "calc(2em + 1.5vw)",
                    fontFamily: "Inter, sans-serif",
                    marginBottom: "10px",
                  }}
                >
                  Login
                </h1>
                <p className=" text-lg-start text-center">
                  Login to access your account
                </p>
                {error && <p className="error-message"> {error.message} </p>}
                <form onSubmit={this.handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label htmlFor="email">Email Adress</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      id="email"
                      value={email}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <div className=" text-lg-start text-center">
                    <Button
                      className="submit center"
                      variant="outline-success"
                      size="lg"
                      type="submit"
                    >
                      Login
                    </Button>
                  </div>

                  <Form.Text
                    className="text-muted"
                    style={{ marginTop: "20px" }}
                  >
                    Don't have an account?{" "}
                    <Link className="login-btn text-success" to="/register">
                      Register Here
                    </Link>
                  </Form.Text>
                </form>
              </div>
            </Col>

            <Col lg={true}>
              <figure className="dev-image">
                <img
                  className="img-fluid"
                  src={require("../img/1-bg.png")}
                  alt=""
                />
              </figure>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
