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