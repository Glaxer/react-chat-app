import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ChatSend extends Component {
  constructor() {
    super();
    this.state = {
      chatText: ''
    }
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.submitMessage} className="d-flex send-form">
          <Form.Control 
            type="text" 
            placeholder="Type your message ..." 
            onKeyUp={(e) => this.userTyping(e)} 
            id="chatsendbox" 
            className="chat-send-box"
            onFocus={this.userClickedInput}
            autoComplete="off"
            autoFocus >
          </Form.Control>
          <Button type="submit" className="send-btn">
            <FontAwesomeIcon icon={['fas', 'paper-plane']} />
          </Button> 
        </Form>
      </div>
    )
  }

  //Send message if enter (key 13) is pressed, otherwise update chat text to contain current value
  userTyping = (e) => e.keyCode === 13 ? this.submitMessage : this.setState({ chatText: e.target.value });

  //Find all space characters inside the string and replace with empty string. Not valid if all spaces or empty string
  messageValid = (txt) => txt && txt.replace(/\s/g, '').length;

  submitMessage = (event) => {
    event.preventDefault();
    if (this.messageValid(this.state.chatText)) {
      this.props.submitMessageFn(this.state.chatText);
      document.getElementById('chatsendbox').value = ''; //Clear text field
    }
  }

  userClickedInput = () => this.props.messageReadFn();

}

export default ChatSend;