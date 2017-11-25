import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Comment,LoginMaskLayer,store} from '../../index';
import '../../dist/style.css';


const scope= document.getElementById('react-comment-container').getAttribute("data-scope");
const topicId=document.getElementById('react-comment-container').getAttribute("data-topicId");

// window.isLogin=false;

ReactDOM.render(
    (<Provider store={store}>
        <div style={{ position:'relative' }}>
            <LoginMaskLayer/>
            <Comment scope={scope} topicId={topicId} />
        </div>
    </Provider>),
    document.getElementById("react-comment-container")
);