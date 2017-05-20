import {TYPES} from '../actions';


function __(action){
    switch(action){
        case TYPES.upvoteSucceeded:
            var comment=action.comment;
            var comments=state.comments.slice();
            comments.forEach(c=>{
                if(c.id==comment.id){
                    c.upvotes=comment.upvotes;
                }
            })
            return Object.assign({},state,{ comments }) ;
        case TYPES.upvoteFailed:
            alert(`同一个答案只能赞一次`);
            return state;
    
        case TYPES.downvoteSucceeded:
            const comment=action.comment;
            const comments=state.comments.slice();
            comments.forEach(c=>{
                if(c.id==comment.id){
                    c.downvotes=comment.downvotes;
                }
            });
            return Object.assign({},state,{ comments }) ;
        case TYPES.upvoteFailed:
            alert(`同一个答案只能踩一次`);
            return state;
    }
}


export function commentReducer(state={},action){
    switch(action.type){
        // case TYPES.initialLoadedFetchSucceeded:
        //     const {comments, commentsCount, replies }=action;
        //     return Object.assign({},state,{comments,commentsCount,replies});
        case TYPES.fetchCommentListRecevied:
            const c={comments:action.comments,commentsCount:action.count};
            return Object.assign({},state,c);
        case TYPES.fetchReplyListReceived:
            return Object.assign({},state,{replies:action.replies});
        case TYPES.created:
        default:
            return state;
    }
}