import {TYPES} from '../actions';


function __(action){
    switch(action){
        case TYPES.upvoteFailed:
            alert(`同一个答案只能赞一次`);
            return state;
    
        case TYPES.upvoteFailed:
            alert(`同一个答案只能踩一次`);
            return state;
    }
}


/**
 * 用comment更新comments中id相同的那个comment，
 * 注意，是更新comments，有副作用！使用的时候注意传递一个切片作为参数以避免修改！
 * @param {Array} comments 
 * @param {Object} comment 
 */
function updateCommentsWithOneComment(comments,comment){
    for(let i=0;i<comments.length;i++){
        if(comments[i].id==comment.id){
            comments[i]=comment;
            break;
        }
    }
    return comments;
}

export function commentReducer(state={},action){
    switch(action.type){
        // case TYPES.initialLoadedFetchSucceeded:
        //     const {comments, commentsCount, replies }=action;
        //     return Object.assign({},state,{comments,commentsCount,replies});
        case TYPES.fetchCommentListRecevied:
            const c={comments:action.comments,commentsCount:action.count};
            return Object.assign({},state,c);
        case TYPES.createCommentSucceeded:
        case TYPES.commentListPageChanged:
            const page=action.page;
            return Object.assign({},state,{currentCommentPage:page});
        case TYPES.upvoteCommentSucceeded:
            return Object.assign({},state,{
                comments:updateCommentsWithOneComment(state.comments.slice(),action.comment)
            });
        case TYPES.downvoteCommentSucceeded:
            return Object.assign({},state,{
                comments:updateCommentsWithOneComment(state.comments.slice(),action.comment)
            });
        default:
            return state;
    }
}