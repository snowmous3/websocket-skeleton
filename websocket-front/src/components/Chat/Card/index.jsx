import React, { PureComponent } from 'react';

import CardMessage from './CardMessage';

class HandlerComponentMessage extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { messages } = this.props;
    return <CardMessage
      first={messages.first}
      user={messages.user}
      message={messages.content}
      system={messages.system}
    />
  }
}

export default HandlerComponentMessage;