import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Comment,LoginMaskLayer,store} from '../../index';
import '../../dist/style.css';


const scope= document.getElementById('react-comment-container').getAttribute("data-scope");
const topicId=document.getElementById('react-comment-container').getAttribute("data-topicId");

// window.isLogin=false;

ReactDOM.render(
    (<div style={{position:'relative'}}>
        <LoginMaskLayer isLogin={!!window.isLogin} />
        <Provider store={store}>
            <Comment scope={scope} topicId={topicId} />
        </Provider>
    </div>),
    document.getElementById("react-comment-container")
);