import Api from '../api';
import {TYPES} from './types';
import {config} from '../config';

export {TYPES};


const COMMENT_PAGE_SIZE=config.commentPageSize;
const REPLY_PAGE_SIZE=config.replyPageSize;


/**
 * 获取某页的次级回复列表
 * @param {String} scope 
 * @param {Number} topicId 
 * @param {Number} page 
 * @param {Number} size 
 * @param {Number} replyPageSize 
 */
export function fetchReplyListOfPage(scope,topicId,page=1,size=COMMENT_PAGE_SIZE,replyPageSize=REPLY_PAGE_SIZE){

    return dispatch=>{
        return Api.fetchReplyListOfPage(scope,topicId,page,size,replyPageSize)
            .then(info=>{
                // 触发接收
                const received=fetchReplyListOfPageReceived(info);
                dispatch(received);
            });
    };
}


/**
 * 获取到某页的回复列表
 * @param {Object} replies 
 */
export function fetchReplyListOfPageReceived(replies){
    return {
        type:TYPES.fetchReplyListOfPageReceived,
        replies:replies,
    };
}



/**
 * 获取回复于某个评论（或者某个回复）的回复列表
 * @param {String} scope 
 * @param {Number} topicId 
 * @param {Number} replyUnder 
 * @param {Number} page 
 * @param {Number} size 
 */
export function fetchReplyListOfComment(scope,topicId,replyUnder,page,size){
    return dispatch=>{
        return Api.fetchReplyListUnder(scope,topicId,replyUnder,page,size)
            .then(info=>{
                const {comments,count}=info;
                dispatch(fetchReplyListOfCommentSucceeded(replyUnder,comments,count));
            });
    };
}



/**
 * 请求某个评论（或者回复）的回复列表完成
 * @param {Number} commentId 
 * @param {Array} rows 
 * @param {Number} count 
 */
export function fetchReplyListOfCommentSucceeded(commentId,rows,count){
    return {
        type:TYPES.fetchReplyListOfCommentSucceeded,
        commentId,
        rows,
        count,
    };
}


/**
 * 某个评论的回复翻页
 */
export function replyListPageChanged(commentId,page){
    return {
        type:TYPES.replyListPageChanged,
        commentId,
        page,
    };
}



/**
 * 从服务器获取顶级评论列表
 * @param {String} scope 主题域
 * @param {Number} topicId 主题ID
 * @param {Number} page 评论分页页码
 * @param {Number} size 评论分页每页数量
 */
export function fetchCommentList(scope,topicId,page=1,size=COMMENT_PAGE_SIZE){
    return dispatch=>{
        return Api.fetchCommentList(scope,topicId,page,size)
            .then(info=>{
                const {comments,count}=info;
                dispatch(fetchCommentListRecevied(comments,count));
                dispatch(commentListPageChanged(page));
            })
    };
}

/**
 * 接收到评论列表
 * @param {Array} comments 
 * @param {Number} count 
 */
export function fetchCommentListRecevied(comments,count){
    return {
        type:TYPES.fetchCommentListRecevied,
        comments,
        count,
    };
}


/**
 * 顶级评论翻页
 */
export function commentListPageChanged(page){
    return {
        type:TYPES.commentListPageChanged,
        page,
    };
}




/**
 * 提交创建评论的请求
 * @param {String} scope 
 * @param {Number} topicId 
 * @param {Number} replyTo 
 * @param {String} content 
 */
export function createComment(scope,topicId,replyTo,content){
    return dispatch=>{
        return Api.create(scope,topicId,replyTo,content)
            .then(comment=>{
                dispatch(createCommentSucceeded(comment));
                const page=1;
                const size=10; // todo: 待修改
                dispatch(fetchCommentList(scope,topicId,replyTo,page,size))
            });
    };
}

/**
 * 创建成功
 * @param {Object} comment 新创建的 comment
 */
export function createCommentSucceeded(comment){
    return {
        type:TYPES.createCommentSucceeded,
        comment,
    };
}


export function createReply(scope,topicId,replyTo,content){
    return dispatch=>{
        return Api.create(scope,topicId,replyTo,content)
            .then(reply=>{
                dispatch(createReplySucceeded(reply));
                // const page=1;
                // const size=10; // todo: 待修改
                // dispatch(fetchReplyListOfComment(scope,topicId,reply.replyUnder,page,size))
                return reply;
            });
    };
}


export function createReplySucceeded(reply){
    return {
        type:TYPES.createReplySucceeded,
        reply,
    };
}


/**
 * 投票反对回复或者评论，返回Promise<Comment>
 * @param {Number} commentId 
 */
export function downvote(commentId){
    return dispatch=>{
        return Api.downvote(commentId);
    };
}

/**
 * 投票赞成回复或者评论，返回Promise<Comment>
 * @param {Number} commentId 
 */
export function upvote(commentId){
    return dispatch=>{
        return Api.upvote(commentId);
    };
}


/**
 * 投票反对成功
 */
export function downvoteCommentSucceeded(comment){
    return {
        type:TYPES.downvoteCommentSucceeded,
        comment,
    };
}

/**
 * 投票反对失败
 */
export function downvoteCommentFailed(comment){
    return {
        type:TYPES.downvoteCommentFailed,
        comment,
    };
}





/**
 * 投票赞成成功
 * @param {Object} comment 
 */
export function upvoteCommentSucceeded(comment){
    return {
        type:TYPES.upvoteCommentSucceeded,
        comment,
    };
}


/**
 * 投票赞成失败
 * @param {Object} comment 
 */
export function upvoteCommentFailed(comment){
    return {
        type:TYPES.upvoteCommentFailed,
    };
}




/**
 * 投票反对成功
 * @param {Object} reply 
 */
export function downvoteReplySucceeded(reply){
    return {
        type:TYPES.downvoteReplySucceeded,
        comment:reply,
    };
}

/**
 * 投票反对失败
 * @param {Object} reply 
 */
export function downvoteReplyFailed(reply){
    return {
        type:TYPES.downvoteReplyFailed,
        comment:reply,
    };
}



/**
 * 投票赞成成功
 * @param {Object} reply 
 */
export function upvoteReplySucceeded(reply){
    return {
        type:TYPES.upvoteReplySucceeded,
        comment:reply,
    };
}


/**
 * 投票赞成失败
 * @param {Object} reply 
 */
export function upvoteReplyFailed(reply){
    return {
        type:TYPES.upvoteReplyFailed,
        comment:reply,
    };
}