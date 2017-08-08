import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {App} from './app';
import {store} from '../../index';
import '../../dist/style.css';

ReactDOM.render(
    <Provider store={store}>
        <App></App>
    </Provider>,
    document.getElementById("app")
);