import React from 'react';

import HandlerComponentMessage from '../../Chat/Card';

const Main = ({ messages }) => (
  <main>
    <div className="container">
      <div id="main">
        { messages.map((m, index) => (
          <HandlerComponentMessage key={index} messages={m} />
        ))}
      </div>
    </div>
  </main>
)

export default Main;