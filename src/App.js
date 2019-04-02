import React, { Component } from 'react';
import CreateMessage from './components/CreateMessage';
import Messages from './components/Messages';

import socketIOClient from 'socket.io-client';

var socket = null;

class App extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      messages: []
    }

    if(socket === null) {
      socket = socketIOClient('http://localhost:4001');
    }

    socket.on('SET_USERNAME', (username) => {
      this.setState({
        username
      });
    });

    socket.on('CREATE_MESSAGE', (messageObject) => {
      this.setState({
        messages: [...this.state.messages, messageObject]
      });
      this.myRef.current.scrollTop = this.myRef.current.clientHeight;
    });

    this.myRef = React.createRef();
  }
  render() {
    return (
      <div className="chat">
        <Messages refProp={this.myRef} messages={this.state.messages} username={this.state.username} />
        <CreateMessage handlerCreateMessage={this.handlerCreateMessage} />
      </div>
    );
  }
  handlerCreateMessage = (message) => {
    message.user = this.state.username;
    socket.emit('SEND_MESSAGE', message);
  }
}

export default App;
