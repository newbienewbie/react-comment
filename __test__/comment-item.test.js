import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import {CommentItem} from '../lib/comment-item';


describe("test《comment-item.js》",function(){

    const props={
        id:'888',
        author:{name:'webbot',email:'itminus@hotmail.com',avatarUrl:'#',introduction:'sth ',},
        content:'hello,world',
        upvotes:2,
        downvotes:0,
        createdAt:new Date('2017-05-15T12:03:25.742Z'),
        updatedAt:new Date('2017-05-15T12:07:25.742Z'),
        onUpvote:(id)=>{},
        onDownvote:(id)=>{},
    };
    


    it("compare snapshot",()=>{
        const component=renderer.create(<CommentItem 
            id={props.id} author={props.author}  
            content={props.content}
            upvotes={props.upvotes}
            downvotes={props.downvotes}
            createdAt={props.createdAt}
            updatedAt={props.updatedAt}
            onUpvote={props.onUpvote}
            onDownvote={props.onDownvote}
        />);
    
        let tree=component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    
    
    it("simulate click",()=>{
    
        // mock function
        const onUpvote=jest.fn();
        const onDownvote=jest.fn();
    
        const component=ReactTestUtils.renderIntoDocument(<CommentItem
            id={props.id} author={props.author}  
            content={props.content}
            upvotes={props.upvotes}
            downvotes={props.downvotes}
            createdAt={props.createdAt}
            updatedAt={props.updatedAt}
            onUpvote={onUpvote}
            onDownvote={onDownvote}
        />);
    
        // find all the buttons
        const btns=ReactTestUtils.scryRenderedDOMComponentsWithTag(component,"button");
    
        // click upvote button
        ReactTestUtils.Simulate.click(btns[0]);
        expect(onUpvote).toBeCalled();
        ReactTestUtils.Simulate.click(btns[0]);
        expect(onUpvote.mock.calls.length).toBe(2);
    
        // click downvote button
        ReactTestUtils.Simulate.click(btns[1]);
        expect(onDownvote).toBeCalled();
        ReactTestUtils.Simulate.click(btns[1]);
        expect(onDownvote.mock.calls.length).toBe(2);
    
    });

});
    