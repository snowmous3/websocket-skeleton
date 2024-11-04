import React, { Component } from 'react';

import { activeFullScreen, disableFullScreen } from '../../../services/fullScreen';

import './index.css';

class Header extends Component {
  state = {
    fullScreen: false,
  };

  handlerFullScreen = e => {
    this.setState({ fullScreen: !this.state.fullScreen });
  }

  handlerFullScreenButton = async e => {
    console.log('Clicou :D ');
    await this.handlerFullScreen();

    console.log('State atualizado ', this.state.fullScreen);
    if (this.state.fullScreen) activeFullScreen();
    disableFullScreen();
  }

  render() {
    return (
      <header>
          <div className="content content-header">
            <span className="header-title"> Name Company</span>
            <img
              className="content-header-image"
              src={require('../../../assets/icons/fullScreen.svg')}
              alt="fullScreen"
              title="FullScreen"
              onClick={this.handlerFullScreenButton}
            />
          </div>
      </header>
    )
  }
}

export default Header;