import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Comment,LoginMaskLayer,store} from '../../index';
import '../../dist/style.css';


const el=document.getElementById('react-comment-container');
const scope= el.getAttribute("data-scope");
const topicId=el.getAttribute("data-topicId");
const loginUrl=el.getAttribute("data-loginUrl");

// window.isLogin=false;

ReactDOM.render(
    (<Provider store={store}>
        <div style={{ position:'relative' }}>
            <LoginMaskLayer loginUrl={loginUrl} />
            <Comment scope={scope} topicId={topicId} />
        </div>
    </Provider>),
    document.getElementById("react-comment-container")
);