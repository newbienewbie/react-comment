
export const TYPES={
    initialLoadFetch:'INITIAL_LOAD_FETCH',
    initialLoadedFetchSucceeded:'INITIAL_LOAD_FETCH_SUCCEEDED',

    fetchFirstPageReplyList:'FETCH_FIRST_PAGE_REPLY_LIST',
    fetchFirstPageReplyListReceived:'FETCH_FIRST_PAGE_REPLY_LIST_RECEIVED',
    
    replyListPageChanged:'REPLY_LIST_PAGE_CHANGED',

    fetchCommentList:'FETCH_COMMENT_LIST',
    fetchCommentListRecevied:'FETCH_COMMENT_LIST_RECEIVED',
    commentListPageChanged:'COMMENT_LIST_PAGE_CHANGED',
    
    create:'CREATE_COMMENT_OR_REPLY',
    created:'CREATE_COMMENT_OR_REPLY_DONE',

    upvote:"UP_VOTE",
    upvoteSucceeded:'UPVOTE_SUCCESSED',
    upvoteFailed:'UPVOTE_FAILED',

    downvote:"DOWN_VOTE",
    downvoteSucceeded:'DOWNVOTE_SUCCEEDED',
    downvoteFailed:'DOWNVOTE_FAILED',
    
    reply:"REPLY",
    comment:"COMMENT",
};

export default TYPES;