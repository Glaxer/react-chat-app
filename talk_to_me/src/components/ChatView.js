import React, { Component } from 'react';
import firebase from 'firebase/app';

class ChatView extends Component {
  constructor() {
    super();
    this.state = {
      chat: null,
      user: null,
      friendName: null,
      friendEmail: null,
      friendAddress: null
    }
  }

  componentDidUpdate = (previousProps, previousState) => {
    const container = document.getElementById('chatview-content');

    if (container) {
      container.scrollTo(0, container.scrollHeight);
    }

    if (previousProps.chat === undefined) {
      this.findFriend();
    } else {
      if (previousProps.chat !== this.props.chat) {
        this.findFriend();
      }
    }
  }

  findFriend = () => {
    const { chat, user } = this.props;

    if (chat !== undefined) {
      const searchedUser = chat.users.filter(_user => _user !== user)[0];
      this.setState({ friendEmail: searchedUser })
      firebase.firestore().collection("users").doc(searchedUser)
        .onSnapshot(async (res) => {
          const user = res.data();
          await this.setState({
            friendEmail: user.email,
            friendName: user.userName,
            friendAddress: user.address
          });
        });
    }
  }

  render() {
    const { chat, user } = this.props;


    if (chat === undefined) {
      return (
        <section id="chatview-content" className="chat-content empty"></section>
      )
    } else {
      return (
        <div className="chat-container">
          <div className="chat-header">
            <div className="friend-avatar">
              <div className="user-avatar">
                <span>
                  {chat.users.filter(_user => _user !== user)[0].split('')[0]}
                </span>
              </div>
            </div>
            <div className="friend-info">
              <h6>{this.state.friendName}</h6>
              <p className="mb-0">{this.state.friendEmail} | {this.state.friendAddress} </p>
            </div>
          </div>
          <section id="chatview-content" className="chat-content">
            {
              chat.messages.map((_msg, _index) => {
                return (
                  <div key={_index} className={_msg.sender === user ? "user-sent message-sent" : "friend-sent message-sent"}>
                    {_msg.message}
                  </div>
                )
              })
            }
          </section>
        </div>
      );
    }
  }

}


export default ChatView;