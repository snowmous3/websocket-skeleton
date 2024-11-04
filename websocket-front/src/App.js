import React, { Component } from "react";
import Header from './components/layout/Header';

import './index.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      email: ''
    }
  };

  handlerEnterChat = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  enterChat = e => {
    this.props.history.push('/chat', { name: this.state.name });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="title"></div>
        <div>
          Nome:
        </div>
        <div>
          <input
            type="text"
            className="input-message"
            name="name"
            placeholder="Nome"
            autoComplete="off"
            onKeyPress={this.keyPressEnter}
            onChange={this.handlerEnterChat}
            value={this.state.name}
          />
          <div>
            Email:
          </div>
          <input
            type="text"
            className="input-message"
            name="email"
            placeholder="Email"
            autoComplete="off"
            onKeyPress={this.keyPressEnter}
            onChange={this.handlerEnterChat}
            value={this.state.email}
          />
          <input
            href={'chat'}
            type="submit"
            className="teste"
            value="ENTRAR"
            disabled={this.state.name.length === 0}
            onClick={this.enterChat}
          />
        </div>
      </div>
    );
  }
}

export default App;
