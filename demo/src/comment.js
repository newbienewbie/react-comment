import React from 'react';
import {connect} from 'react-redux';
import {Comment} from '../../lib/components/comment';


function mapStateToProps(state){
    return {
        comments:state.comment.comments,
        commentsCount:state.comment.commentsCount,
        commentPageSize:state.comment.commentPageSize, 
        replies:state.replies,
        replyPageSize:state.replyPageSize,
    };
}

export const CommentContainer=connect(mapStateToProps)(Comment);