/**
 * THe job of the main entrypoint is to:
 * 1) initialize middleware
 * 2) create the store (with the root reducer and middleware)
 * 3) pass the store down to the App, by wrapping App in a provider node
 */

import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import App from './containers/App';

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}

debugger;
const store = createStore(reducer, applyMiddleware(...middleware));
debugger;
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
