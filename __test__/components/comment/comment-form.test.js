import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import {CommentForm} from '../../../lib/components/comment/comment-form';


describe("test《comment-form.js》",function(){

    const props= {
        author:{name:'',email:'',avatarUrl:'#',introduction:'',},
        onSubmit:(content)=>{},
    };



    it("compare snapshot",()=>{
        const component=renderer.create(<CommentForm 
            author={props.author}
            onSubmit={props.onSubmit}
        />);
        let tree=component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    
    
    it("simulate change",()=>{
    
        // mock function
        const onSubmit=jest.fn();
    
        const component=ReactTestUtils.renderIntoDocument(<CommentForm
            author={props.author}
            onSubmit={onSubmit}
        />);

        // find the form 
        const form=ReactTestUtils.findRenderedDOMComponentWithTag(component,"form");
        // find all the buttons
        const btns=ReactTestUtils.scryRenderedDOMComponentsWithTag(component,"button");

        // change input
        const input=ReactTestUtils.findRenderedDOMComponentWithTag(component,"textarea");
        ReactTestUtils.Simulate.change(input);
    
        // click cancel button
        ReactTestUtils.Simulate.click(btns[0]);
        
        // change input again
        ReactTestUtils.Simulate.change(input);
    
        // click submit button
        ReactTestUtils.Simulate.click(btns[1]);
        expect(onSubmit).toBeCalled();
        console.log(onSubmit.mock.calls);
    
    });

});
    