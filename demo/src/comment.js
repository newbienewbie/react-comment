import React from 'react';
import {connect} from 'react-redux';
import {Comment} from '../../lib/components/comment';


function mapStateToProps(state){
    return {
        comments:state.comment.comments,
        commentsCount:state.comment.commentsCount,
        commentPageSize:state.comment.commentPageSize, 
        currentCommentPage:state.comment.currentCommentPage,
        replies:state.reply.replies,
        replyPageSize:state.reply.replyPageSize,
    };
}

export const CommentContainer=connect(mapStateToProps)(Comment);