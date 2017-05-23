import {TYPES} from '../actions';



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

export function replyReducer(state={},action){
    switch(action.type){
        case TYPES.fetchFirstPageReplyListReceived:
            // 迭代，改变每一个页码为1
            Object.keys(action.replies).forEach(k=>{
                action.replies[k].page=1;
            });
            return Object.assign({},state,c);
        case TYPES.replyListPageChanged:
        case TYPES.upvoteSucceeded:
        case TYPES.downvoteSucceeded:
        default:
            return state;
    }
}