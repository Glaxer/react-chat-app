import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import firebase from 'firebase/app';

class NewChat extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      message: null,
    }
  }

  render() {
    return (
      <section>
        <div>
          <h3>Send a message</h3>
          <Form onSubmit={(e) => this.submitNewChat(e)}>
            <Form.Control
              type="text" 
              placeholder="Enter your friend's email" 
              required
              autoFocus
              onChange={(e) => this.userTyping('username', e)}
            >
            </Form.Control>
            <Form.Control
              type="text"
              placeholder="Enter your message"
              onChange={(e) => this.userTyping('message', e)}
            >
            </Form.Control>
            <Button type="submit">Submit</Button>
          </Form>
        </div>
      </section>
    )
  }

  userTyping = (type, e) => {
    switch (type) {
      case 'username':
        this.setState({ username: e.target.value });
        break;

      case 'message':
        this.setState({ message: e.target.value });
        break;

      default:
        break;
    }
  }

  submitNewChat = async (e) => {
    e.preventDefault();
    const userExists = await this.userExists();
    if (userExists) {
      const chatExists = await this.chatExists();
      chatExists ? this.goToChat() : this.createChat();
    }
  }

  createChat = () => {
    this.props.newChatSubmitFn({
      sendTo: this.state.username,
      message: this.state.message
    });
  }

  goToChat = () => {
    this.props.goToChatFn(this.buildDocKey(), this.state.message);
  }

  buildDocKey = () => {
    return [firebase.auth().currentUser.email, this.state.username].sort().join(':');
  }

  chatExists = async () => {
    const docKey = this.buildDocKey();
    const chat = await firebase.firestore().collection('chats').doc(docKey).get();
    console.log(chat.exists);
    return chat.exists;
  }

  userExists = async () => {
    const usersSnapshot = await firebase.firestore().collection('users').get();
    const exists = usersSnapshot.docs.map(_doc => _doc.data().email).includes(this.state.username);
    //this.setState({ serverError: !exists });
    return exists;
  } 
}

export default NewChat;