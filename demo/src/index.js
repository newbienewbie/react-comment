import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Comment,store} from '../../index';
import '../../dist/style.css';


const scope= document.getElementById('react-comment-container').getAttribute("data-scope");
const topicId=document.getElementById('react-comment-container').getAttribute("data-topicId");


ReactDOM.render(
    <Provider store={store}>
        <Comment scope={scope} topicId={topicId} />
    </Provider>,
    document.getElementById("react-comment-container")
);