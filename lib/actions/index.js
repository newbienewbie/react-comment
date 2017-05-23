import Api from '../api';
import {TYPES} from './types';

export {TYPES};

/**
 * 初始加载，获取顶级评论和次级回复
 * @param {String} scope 
 * @param {Number} topicId 
 * @param {Number} replyTo 
 * @param {Number} commentPageSize 
 * @param {Number} replyPageSize 
 */
export function initialLoadFetch(scope,topicId,replyTo,commentPageSize,replyPageSize){
    return dispatch=>{
        return Api.fetchWhenInitialLoading(scope,topicId,replyTo,commentPageSize,replyPageSize)
            .then(obj=>{
                const {comments, commentsCount, replies}=obj;
                const action=initialLoadFetchSucceeded(comments,commentsCount,replies);
                dispatch(action);
            });
    };
}


export function initialLoadFetchSucceeded(comments, commentsCount, replies){
    return {
        type:TYPES.initialLoaded,
        comments,
        commentsCount,
        replies,
    };
}


/**
 * 获取次级回复列表
 * @param {String} scope 
 * @param {Number} topicId 
 * @param {Number} page 
 * @param {Number} size 
 * @param {Number} replyPageSize 
 */
export function fetchReplyList(scope,topicId,page=1,size=10,replyPageSize=10){

    return dispatch=>{
        return Api.fetchFirstPageReplyList(scope,topicId,page,size,replyPageSize)
            .then(info=>{
                // 触发接收
                const received=fetchReplyListReceived(info);
                dispatch(received);
            });
    };
}


/**
 * 获取到回复列表
 * @param {Object} replies 
 */
export function fetchReplyListReceived(replies){
    return {
        type:TYPES.fetchReplyListReceived,
        replies:replies,
    };
}



/**
 * 某个评论的回复翻页
 */
export function replyListPageChanged(comment,page){
    return {
        type:TYPES.replyListPageChanged,
        comment,
        page,
    };
}



/**
 * 从服务器获取评论列表
 * @param {String} scope 主题域
 * @param {Number} topicId 主题ID
 * @param {Number} replyTo 所回复评论的ID，即向哪个评论回复
 * @param {Number} page 评论分页页码
 * @param {Number} size 评论分页每页数量
 */
export function fetchCommentList(scope,topicId,replyTo,page=1,size=8){
    return dispatch=>{
        return Api.fetchCommentOrReplyList(scope,topicId,replyTo,page,size)
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
 * 评论翻页
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
export function create(scope,topicId,replyTo,content){
    return dispatch=>{
        return Api.create(scope,topicId,replyTo,content)
            .then(comment=>{
                dispatch(created(comment));
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
export function created(comment){
    return {
        type:TYPES.created,
        comment,
    };
}


/**
 * 投票反对
 * @param {Number} commentId 
 */
export function downvote(commentId){
    return dispatch=>{
        return Api.downvote(commentId)
            .then(comment=>{
                if(comment){
                    dispatch(downvoteSucceeded(comment));
                }else{
                    dispatch(downvoteFailed(comment));
                }
            });
    };
}



/**
 * 投票反对成功
 */
export function downvoteSucceeded(comment){
    return {
        type:TYPES.downvoteSucceeded,
        comment,
    };
}

/**
 * 投票反对失败
 */
export function downvoteFailed(comment){
    return {
        type:TYPES.downvoteFailed,
        comment,
    };
}



/**
 * 投票赞成处理器
 * @param {Number} commentId 
 */
export function upvote(commentId){
    return dispatch=>{
        return Api.upvote(commentId)
            .then(comment=>{
                if(comment){
                    dispatch( upvoteSucceeded(comment));
                }else{
                    dispatch(upvoteFailed(comment))
                }
            });
    };
}


/**
 * 投票赞成成功
 * @param {Object} comment 
 */
export function upvoteSucceeded(comment){
    return {
        type:TYPES.upvoteSucceeded,
        comment,
    };
}


/**
 * 投票赞成失败
 * @param {Object} comment 
 */
export function upvoteFailed(comment){
    return {
        type:TYPES.upvoteFailed,
    };
}