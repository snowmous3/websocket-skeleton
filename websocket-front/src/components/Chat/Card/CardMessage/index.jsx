import React, { Component } from 'react';
import './index.css';

class CardMessage extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  
  getClassCardMessage = () => {
    if (this.props.system) {
      return 'card card-message card-message-robot'
    } else {
      return 'card card-message card-message-user'
    }
  }

  getClassCardBalloon = () => {
    if (this.props.system) {
      return 'animated slideInLeft card-message-balloon'
    } else {
      return 'animated slideInRight card-message-balloon'
    }
  }

  render () {
    return (
      <div>
      {
        this.props.first === true
          ? (
            <div className="enter">
              <div dangerouslySetInnerHTML={{__html: this.props.message}}></div>
            </div>
          )
          : (
            <div className={this.getClassCardMessage()}>
              <div className={this.getClassCardBalloon()}>
                <div>
                  <h5 dangerouslySetInnerHTML={{__html: this.props.user}}></h5>
                  <div dangerouslySetInnerHTML={{__html: this.props.message}}></div>
                </div>
              </div>
            </div>
          )
      }
      </div>
    );
  }
}

export default CardMessage;