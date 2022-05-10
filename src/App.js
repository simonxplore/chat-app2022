import "./App.css";
import React from "react";
import Chatbox from "./components/Chatbox";
import { Link } from "react-router-dom";
import firebase from "./firebase";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import { Form } from "react-bootstrap";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.message !== "") {
      const chatRef = firebase.database().ref("general");
      const chat = {
        message: this.state.message,
        user: this.props.user.displayName,
        timestamp: new Date().getTime(),
      };
      chatRef.push(chat);
      this.setState({ message: "" });
    }
  };

  render() {
    return (
      <Container fluid="md">
        <Row className="align-items-center">
          <Col lg={true}>
            <div className="App" style={{ margin: "4em" }}>
              <h1
                class="text-success text-left"
                style={{
                  fontSize: "4rem",
                  fontFamily: "Inter, sans-serif",
                  marginBottom: "10px",
                }}
              >
                For Developers
              </h1>

              {this.props.user && (
                <div className="allow-chat">
                  <Chatbox />
                  <form className="message-form" onSubmit={this.onSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control
                        type="text"
                        name="message"
                        id="message"
                        value={this.state.message}
                        placeholder="Enter a message..."
                        onChange={this.onChange}
                      />
                    </Form.Group>
                    <Button
                      className="send"
                      variant="outline-success"
                      size="lg"
                      type="submit"
                    >
                      Send Message
                    </Button>
                  </form>
                </div>
              )}
              {!this.props.user && (
                <div className="disallow-chat text-left">
                  <p
                    style={{
                      fontSize: "1.2em",
                    }}
                  >
                    Welcome to Dach! In here you will be able to ask any
                    question about coding and get answers by professionals!
                  </p>

                  <Link to="/register">
                    <Button variant="outline-success" size="lg">
                      Join Us
                    </Button>{" "}
                  </Link>
                </div>
              )}
            </div>
          </Col>
          <Col lg={true}>
            <figure className="dev-image">
              <img
                className="img-fluid"
                src={require("./img/1-bg.png")}
                alt=""
              />
            </figure>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
