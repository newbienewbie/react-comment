import Api from '../api';
import {TYPES} from './types';



/**
 * 投票赞成处理器
 * @param {Number} commentId 
 */
export function upvote(commentId){
    return dispatch=>{
        return Api.upvote(commentId)
            .then(comment=>{
                if(comment){
                    dispatch(comment);
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