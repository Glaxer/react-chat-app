import React, { Component } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import firebase from 'firebase/app';

class ChatList extends Component {

  render() {
    if (this.props.chats.length > 0) {
      return (
        <section className="chat-list">
          <ListGroup>
            {
              this.props.chats.map((_chat, _index) => {
                return (
                  <ListGroup.Item key={_index} onClick={() => this.selectChat(_index)} active={this.props.selectedChatIndex === _index}
                    className={
                      _chat.receiverHasRead === false && !this.userIsSender(_chat) ?
                        "new-message" :
                        null
                    }
                  >
                    <div className="list-group-item-avatar">
                      <div className="user-avatar">
                        <span>
                          {_chat.users.filter(_user => _user !== this.props.userEmail)[0].split('')[0]}
                        </span>
                      </div>
                    </div>

                    <div className="list-group-item-text">
                      <h6>{_chat.users.filter(_user => _user !== this.props.userEmail)[0]}</h6>
                      <React.Fragment>
                        <p className="mb-0">{_chat.messages[_chat.messages.length - 1].message.substring(0, 30) + '...'}</p>
                      </React.Fragment>
                    </div>
                  </ListGroup.Item>
                )
              })
            }
          </ListGroup>
          <div className="button-wrapper">
            <Button onClick={this.newChat} className="w-50">
              <FontAwesomeIcon icon={['fas', 'paper-plane']} />
              New Chat
            </Button>

            <Button onClick={this.signOut} className="w-50">
              <FontAwesomeIcon icon={['fas', 'sign-out-alt']} />
              Sign Out
            </Button>
          </div>
        </section>
      )
    } else {
      return (
        <section className="chat-list">
          <ListGroup></ListGroup>
          <div className="button-wrapper">
            <Button onClick={this.newChat} className="w-50">
              <FontAwesomeIcon icon={['fas', 'paper-plane']} />
              New Chat
            </Button>

            <Button onClick={this.signOut} className="w-50">
              <FontAwesomeIcon icon={['fas', 'sign-out-alt']} />
              Sign Out
            </Button>
          </div>
        </section>
      )
    }
  }

  newChat = () => {
    this.props.newChatBtnFn();
  }

  signOut = () => firebase.auth().signOut();


  selectChat = (index) => {
    this.props.selectChatFn(index);
  }

  userIsSender = (chat) => chat.messages[chat.messages.length - 1].sender === this.props.userEmail;
}

export default ChatList;