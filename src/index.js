import React from 'react';
import ReactDOM from 'react-dom';
import _ from "./mock.js";
import Counter from './components/Counter'
import logger from './reduxMiddle/redux-logger'
import thunk from './reduxMiddle/redux-thunk'
import {
    createStore,
    applyMiddleware,
    combineReducers,
} from './redux';
import {Provider} from "./react-redux";
import _reducers from './reducers';

const reducers = combineReducers(_reducers);
const store = createStore(reducers, {}, applyMiddleware(thunk, logger));

ReactDOM.render(
    <Provider
        store={store}
    >
        <Counter />
    </Provider>,
    document.getElementById('root')
);
