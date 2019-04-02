import React, { Component } from 'react';

class Messages extends Component {
  render() {
    return (
      <div className="messages" ref={this.props.refProp}>
        {this.props.messages.map((message, indexMessage) =>
          <div className={`message ${(this.props.username === message.user ? 'message--me' : '')}`} key={indexMessage}>
            <div className="message__user">{message.user}</div>
            <div className="message__content">{message.content}</div>
          </div>
        )}
      </div>
    );
  }
}

export default Messages;
