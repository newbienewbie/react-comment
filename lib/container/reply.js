import React from 'react';
import {connect} from 'react-redux';
import {Reply as ReplyComponent} from '../components/reply';


const defaultReply={
    rows:[],
    count:0,
    page:1
};

function getRepliesOfComment(replies,commentId){
    let result=Object.assign({},defaultReply);
    if(!replies || ! replies[commentId]){
        return result;
    }
    return replies[commentId];
}


function mapStateToProps(state){
    return {
        replies:state.reply.replies?state.reply.replies:Object.assign({},defaultReply),
        size:state.reply.replyPageSize,
    };
}

function mapDispathToProps(dispatch){
    return {
        dispatch,
    };
}

function mergeProps(propsFromState,propsFromDispatch,ownProps){
    const commentId=ownProps.replyUnder;
    // set {rows,count}
    const props=getRepliesOfComment(propsFromState.replies,commentId);
    props.size=propsFromState.size;
    props.page=propsFromState.replies.page;
    props.dispatch=propsFromDispatch.dispatch
    /*
        {
            ... propsFromState,
            ... propsFromDispatch
            ... ownProps
        }
    */
    return Object.assign({},props,ownProps);
}



export const Reply=connect(mapStateToProps,mapDispathToProps,mergeProps,{withRef:true})(ReplyComponent);
export default Reply;