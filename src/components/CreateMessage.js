import React, { Component } from 'react';

class CreateMessage extends Component {
  constructor() {
    super();
    this.state = {
      messageContent: ''
    }
  }
  render() {
    return (
      <form className="create-message" onSubmit={this.handlerSubmit}>
        <input type="text" value={this.state.messageContent} onChange={this.handlerChangeMessageContent} placeholder="Please enter message" />
        <input type="submit" value="SEND" />
      </form>
    );
  }
  handlerChangeMessageContent = (e) => {
    this.setState({
      messageContent: e.target.value
    });
  }
  handlerSubmit = (e) => {
    e.preventDefault();

    const message = {
      content: this.state.messageContent
    }

    this.setState({
      messageContent: ''
    })

    this.props.handlerCreateMessage(message);
  }
}

export default CreateMessage;
