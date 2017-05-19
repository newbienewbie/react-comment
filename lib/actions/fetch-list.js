import Api from '../api';
import {TYPES} from './types';


/**
 * 获取次级回复列表
 * @param {String} scope 
 * @param {Number} topicId 
 * @param {Number} page 
 * @param {Number} size 
 * @param {Number} replyPageSize 
 */
export function fetchReplyList(scope,topicId,page=1,size=10,replyPageSize=10){

    return Api.fetchReplyList(scope,topicId,page,size,replyPageSize)
        .then(info=>{
            // 触发接收
            const received=fetchReplyListReceived(info);
            dispatch(received);
        });
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
 * 从服务器获取评论列表
 * @param {String} scope 主题域
 * @param {Number} topicId 主题ID
 * @param {Number} replyTo 所回复评论的ID，即向哪个评论回复
 * @param {Number} page 评论分页页码
 * @param {Number} size 评论分页每页数量
 */
export function fetchCommentList(scope,topicId,replyTo,page=1,size=8){
    return dispatch=>{
        return Api.fetchCommentList(scope,topicId,replyTo,page,size)
            .then(info=>{
                const {comments,count}=info;
                dispatch(fetchCommentListRecevied(comments,count));
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


