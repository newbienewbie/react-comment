import {TYPES} from '../actions';
import {deepcopy} from '../utils';


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



export function commentReducer(state={},action){
    switch(action.type){
        // case TYPES.initialLoadedFetchSucceeded:
        //     const {comments, commentsCount, replies }=action;
        //     return Object.assign({},state,{comments,commentsCount,replies});
        case TYPES.fetchCommentListRecevied:
            return processFetchCommentListReceived(state,action);
        case TYPES.createCommentSucceeded:
        case TYPES.commentListPageChanged:
            const page=action.page;
            return Object.assign({},state,{currentCommentPage:page});
        case TYPES.upvoteCommentSucceeded:
            return processCommentVote(state,action);
        case TYPES.downvoteCommentSucceeded:
            return processCommentVote(state,action);
        default:
            return state;
    }
}



/**
 * 处理动作<FetchCommentListReceived>
 * @param {*} state 
 * @param {*} action 
 */
function processFetchCommentListReceived(state,action){
    const {comments,count}=action;
    const nextState=deepcopy(state);
    return Object.assign({},nextState,{
        comments,
        commentsCount:count,
    });
}



/**
 * 处理用户投票
 * @param {*} state 
 * @param {*} action 
 */
function processCommentVote(state,action){
    const comment=action.comment;
    comment.author=comment.authorId;
    return Object.assign({},state,{
        comments:updateCommentsWithOneComment(state.comments.slice(),comment)
    });
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
