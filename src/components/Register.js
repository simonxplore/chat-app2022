import React from "react";
import firebase from "../firebase.js";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Form } from "react-bootstrap";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
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
    const { email, username, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser;

        user
          .updateProfile({ displayName: username })
          .then(() => {
            this.props.history.push("/");
          })

          .catch((error) => {
            this.setState({ error });
          });
      });
  };

  render() {
    const { email, username, password, error } = this.state;
    return (
      <div className="auth-container mt-2 mt-md-0">
        <Container fluid="md" className="p-3 p-md-0">
          <Row className="align-items-center">
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
                  Register
                </h1>
                {error && <p className="error-message"> {error.message} </p>}
                <form onSubmit={this.handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label htmlFor="username">Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      id="username"
                      value={username}
                      onChange={this.handleChange}
                    />
                    <Form.Text className="text-muted">
                      This name will appear to other Datchers.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      id="email"
                      value={email}
                      onChange={this.handleChange}
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
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
                    <Form.Text className="text-muted">
                      We'll never share your password with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <div className=" text-lg-start text-center">
                    <Button
                      className="submit"
                      variant="outline-success"
                      size="lg"
                      type="submit"
                    >
                      Get started
                    </Button>
                  </div>

                  <Form.Text
                    className="text-muted"
                    style={{ marginTop: "20px" }}
                  >
                    Already have an account?{" "}
                    <Link className="login-btn text-success" to="/login">
                      Login Here
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

export default Register;
