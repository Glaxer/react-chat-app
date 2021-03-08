import React, { Component } from 'react';

class ChatView extends Component {
  componentDidUpdate = () => {
    const container = document.getElementById('chatview-content');

    if (container) {
      container.scrollTo(0, container.scrollHeight);
    }
  }

  render() {
    const { chat, user } = this.props;

    if (chat === undefined) {
      return (
        <section id="chatview-content" className="chat-content"></section>
      )
    } else {
      return (
        <div className="chat-container">
          <div className="chat-header">
            <div className="friend-avatar">
              <img data-holder-rendered="true" src="images/welcome-icon.svg" className="user-img" data-src="holder.js/40x40" alt="40x40" />
              {/* <div className="user-avatar">
                {_chat.users.filter(_user => _user !== this.props.userEmail)[0].split('')[0]}
              </div> */}
            </div>
            <div className="friend-info">
              <h6>{chat.users.filter(_user => _user !== user)}</h6>
              <p className="mb-0">{chat.users.filter(_user => _user !== user)}</p>
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