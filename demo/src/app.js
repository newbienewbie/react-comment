import React from 'react';
import {CommentContainer} from './comment';


export class App extends React.Component{

    render(){
        return <div>
            hello,world
            <CommentContainer scope="post" topicId="1" />
        </div>;
    }
}