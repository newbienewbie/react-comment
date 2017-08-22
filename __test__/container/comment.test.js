import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {Comment} from '../../lib/container/comment';
import {store} from '../../lib/store';


const scope="post"; 
const topicId="1";


describe("test《comment.js》",function(){

    const f=(i)=>{return {
        id:`888${i}`,
        author:{name:`webbot${i}`,email:`itminus@hotmail.com${i}`,avatarUrl:`#${i}`,introduction:`sth${i}`,},
        content:`hello,world${i}`,
        upvotes:i+1,
        downvotes:i-1,
        createdAt:new Date('2017-05-15T12:03:25.742Z'),
        updatedAt:new Date('2017-05-15T12:07:25.742Z'),
        onUpvote:(id)=>{},
        onDownvote:(id)=>{},
    }};
    
    const s=[0,1,2,3,4,5].map(i=>f(i)); 

    it("compare snapshot",()=>{
        // const component=renderer.create(<Comment 
        //     comments={s}
        // />);
        const component=renderer.create(<Provider store={store}>
            <Comment scope={scope} topicId={topicId} comments={s}/>
        </Provider>);
    
        let tree=component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    

});
    