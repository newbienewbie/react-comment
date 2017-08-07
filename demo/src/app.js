import React from 'react';
import {Comment} from '../../lib/container/comment';


export class App extends React.Component{

    render(){
        return <div>
            hello,world
            <Comment scope="post" topicId="1" />
        </div>;
    }
}