import React, { Component } from "react";
import "./App.css";
import io from 'socket.io-client';
import Header from './components/layout/Header';
import Main from './components/layout/Main';
import { sendNotification } from './services/browserNotification';
import axios from 'axios';

const socket = io(process.env.REACT_APP_SOCKET_URL);

class Chat extends Component {
  constructor (props) {
    super(props);
    const stateOld = this.props.location.state;
    this.state = {
      inputMessage: '',
      nameUser: stateOld.name,
      emailUser: stateOld.email,
      messages: [],
      typingData: {
        system: false,
        systemTypingTimeout: 0
      },
    }
    this.renderLastMessages();
    this.renderFooter = this.renderFooter.bind(this);
  };

  async renderLastMessages () {
    let messages = await axios.get(`${process.env.REACT_APP_API_URL}/messages`);
    await this.setMessages(messages);
  }

  setMessages(messages) {
    if (messages.data.length > 0) {
      const message = messages.data.pop();
      const user = message.name;
      const text = message.input;
      const first = message.first;
      this.setState({ messages: [...this.state.messages, { system: true, content: text, user, first }] });
      this.scrollHeight();
      this.setMessages(messages);
    }
  }
  
  async componentDidMount() {
    this.registerToSocket();
  }

  componentDidUpdate() {
    const body = document.getElementById('main');
    body.scrollTop = body.scrollHeight;
  }

  async registerToSocket() {
    this.joinToChat();

    socket.on('toClient', ({ content, type }) => {
      if (document.hidden) {
        sendNotification(content);
      }
      
      let text = content.input;
      let user = content.user;
      let first = false;

      if (content.enter) {
        first = true;
      }

      if (user !== this.state.nameUser) {
        this.setState({ messages: [...this.state.messages, { system: true, content: text, user, first }] });
      }

      this.scrollHeight();
    });
  }

  handlerSendMessage = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  keyPressEnter = e => {
    if (this.state.inputMessage.length > 0 && e.key === 'Enter') this.submitMessage();
  }

  submitMessage = e => {
    socket.emit('toServer', {
      name: this.state.nameUser,
      email: this.state.emailUser,
      input: this.state.inputMessage,
    });

    this.setState({ messages: [...this.state.messages, { system: false, content: this.state.inputMessage }] });
    this.setState({ inputMessage: '' });
    this.scrollHeight();
  }

  scrollHeight = () => {
    const body = document.getElementsByTagName('main')[0];
    body.scrollTop = body.scrollHeight;
  }

  joinToChat = () => {
    this.setState({ messages: [] });
    this.setState({ inputMessage: '' });
    socket.emit('toServer', { name: this.state.nameUser, firstConnect: true });
  }

  renderFooter = () => (
    <footer>
      <input
        type="text"
        className="input-message"
        name="inputMessage"
        placeholder="Digite para começar a conversa"
        autoComplete="off"
        onKeyPress={this.keyPressEnter}
        onChange={this.handlerSendMessage}
        value={this.state.inputMessage}
      />
      <input
        type="submit"
        className="sendMessage"
        value="&raquo;"
        disabled={this.state.inputMessage.length === 0}
        onClick={this.submitMessage}
      />
    </footer>
  )

  render() {
    return (
      <div className="App">
        <section>
          <Header />

          <Main messages={this.state.messages} />

          { this.renderFooter() }

        </section>
      </div>
    );
  }
}

export default Chat;
