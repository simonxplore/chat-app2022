import React from "react";
import firebase from "../firebase";
import { ListGroup } from "react-bootstrap";

class Chatbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
    };
  }

  componentDidMount() {
    const chatRef = firebase.database().ref("general");
    chatRef.on("value", (snapshot) => {
      const getChats = snapshot.val();
      let ascChat = [];
      for (let chat in getChats) {
        if (getChats[chat].message !== "") {
          ascChat.push({
            id: chat,
            message: getChats[chat].message,
            user: getChats[chat].user,
            date: getChats[chat].timestamp,
          });
        }
      }
      const chats = ascChat;
      this.setState({ chats });
    });
  }

  render() {
    return (
      <div className="chatbox">
        <ListGroup className="chat-list">
          {this.state.chats.map((chat) => {
            const postDate = new Date(chat.date);
            return (
              <ListGroup.Item key={chat.id}>
                <em>
                  {postDate.getDate() + "/" + (postDate.getMonth() + 1) + " -"}{" "}
                </em>
                <strong>{chat.user}: </strong>
                {chat.message}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
    );
  }
}

export default Chatbox;
