import "./App.css";
import React from "react";
import Chatbox from "./components/Chatbox";
import { Link } from "react-router-dom";
import firebase from "./firebase";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Form } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { FaDev } from "react-icons/fa";

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
        <Row className="align-items-center justify-content-between">
          <Col lg={true} className="mb-5 mb-lg-0">
            <div className="App mt-5 mt-lg-0">
              {this.props.user && (
                <div className="allow-chat">
                  <h1
                    className="text-success text-center mb-2"
                    style={{
                      fontSize: "calc(2em + 1.5vw)",
                      fontFamily: "Inter, sans-serif",
                      margin: "5em",
                    }}
                  >
                    Chat
                  </h1>
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
                      Send Message <BsFillChatLeftTextFill />
                    </Button>
                  </form>
                </div>
              )}
              {!this.props.user && (
                <div className="disallow-chat text-left">
                  <h1
                    className="text-success text-lg-start text-center mb-2"
                    style={{
                      fontSize: "calc(2em + 1.5vw)",
                      fontFamily: "Inter, sans-serif",
                      margin: "0",
                    }}
                  >
                    <FaDev /> For Developers
                  </h1>
                  <p
                    className=" text-lg-start text-center"
                    style={{
                      fontSize: "1.2em",
                    }}
                  >
                    Welcome to Dach! In here you will be able to ask any
                    question about coding and get answers by professionals!
                  </p>

                  <Link to="/register">
                    <div className=" text-lg-start text-center">
                      <Button variant="outline-success" size="lg">
                        Join Us <BsFillArrowRightCircleFill />
                      </Button>{" "}
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </Col>
          <Col lg={true} className="align-items-center">
            <Image
              fluid
              className="dev-image"
              src={require("./img/1-bg.png")}
              alt=""
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
