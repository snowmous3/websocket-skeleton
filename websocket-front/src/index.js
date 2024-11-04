import './manifestFactory';

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './index.css';
import App from './App';
import Chat from './Chat';

const AppRouter = (
    <BrowserRouter>
        <Switch>
            <Route path="/chat" component={Chat} />
            <Route path="/" component={App} />
        </Switch>
    </BrowserRouter>
);

ReactDOM.render(AppRouter, document.getElementById('root'))
