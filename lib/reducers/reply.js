import {TYPES} from '../actions';
import {deepcopy} from '../utils';



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
    // 转换 回复的作者 为id
    const {comment}=action;
    comment.author=comment.authorId;
    // 获取 回复列表
    const commentId=action.comment.replyUnder;
    const nextState=deepcopy(state);
    let rows=nextState.replies[commentId].rows;
    updateCommentsWithOneComment(rows,action.comment);
    return nextState;
}

function processChangeReplyTo(state,action){
    const commentId=action.replyComponentId;
    const to=action.replyTo;
    const nextState=deepcopy(state);
    nextState.replies[commentId].wantToReplyTo=to;
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
        case TYPES.changeTheReplyToPropOfReplyComponent:
            return processChangeReplyTo(state,action);
        default:
            return state;
    }
}