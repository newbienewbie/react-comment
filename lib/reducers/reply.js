import {TYPES} from '../actions';


function deepCopy(obj){
    return JSON.parse(JSON.stringify(obj));
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

function processReplyVote(state,action){
    const commentId=action.comment.replyUnder;
    const nextState=deepCopy(state);
    let rows=nextState.replies[commentId].rows;
    updateCommentsWithOneComment(rows,action.comment);
    return nextState;
}

export function replyReducer(state={},action){
    switch(action.type){
        case TYPES.fetchReplyListOfPageReceived:
            // 迭代，改变每一个页码为1
            Object.keys(action.replies).forEach(k=>{
                action.replies[k].page=1;
            });
            return Object.assign({},state,{replies:action.replies});
        case TYPES.fetchReplyListOfCommentSucceeded:
            const next=JSON.parse(JSON.stringify(state));
            if(!next.replies || !next.replies[action.commentId]){
                next.replies[action.commentId]={
                    rows:[],
                    count:0,
                    page:1
                };
            }
            next.replies[action.commentId].rows=action.rows;
            next.replies[action.commentId].count=action.count;
            return next;
        case TYPES.replyListPageChanged:
            const _next=JSON.parse(JSON.stringify(state));
            _next.replies[action.commentId].page=action.page;
            return _next;
        case TYPES.upvoteReplySucceeded:
            return processReplyVote(state,action);
        case TYPES.downvoteReplySucceeded:
            return processReplyVote(state,action);
        default:
            return state;
    }
}