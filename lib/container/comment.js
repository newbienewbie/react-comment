import React from 'react';
import {connect} from 'react-redux';
import {Comment as CommentComponent} from '../components/comment';
import {deepcopy} from '../utils';


function mapStateToProps(state){
    return {
        comments:state.comment.comments,
        commentsCount:state.comment.commentsCount,
        commentPageSize:state.comment.commentPageSize, 
        currentCommentPage:state.comment.currentCommentPage,
        replies:state.reply.replies,
        replyPageSize:state.reply.replyPageSize,
        users:state.user,
    };
}

function mapDispathToProps(dispatch){
    return {
        dispatch,
    };
}

function mergeProps(propsFromState,propsFromDispatch,ownProps){

    // 务必注意，不要修改原始的propFromState！！！否则会修改state！！！
    propsFromState=deepcopy(propsFromState);
    // nest user to per comment;
    const users=propsFromState.users;
    const comments=propsFromState.comments?propsFromState.comments:[];
    propsFromState.comments=comments.map(c=>{
        c.author=users[c.author];
        return c;
    });

    const props= Object.assign(propsFromState,propsFromDispatch,ownProps);
    return props;
}

export const Comment=connect(mapStateToProps,mapDispathToProps,mergeProps)(CommentComponent);
export default Comment;