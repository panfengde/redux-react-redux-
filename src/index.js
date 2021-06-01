import React from 'react';
import ReactDOM from 'react-dom';
import _ from "./mock.js";
import Counter from './components/Counter'
import promiseMiddleware from 'redux-promise';
import {
    createStore,
    applyMiddleware,
    combineReducers,
} from './redux';
import {Provider} from "./react-redux";
import _reducers from './reducers';

const reducers = combineReducers(_reducers);
const store = createStore(reducers, {}, applyMiddleware(promiseMiddleware));

ReactDOM.render(
    <Provider
        store={store}
    >
        <Counter />
    </Provider>,
    document.getElementById('root')
);
