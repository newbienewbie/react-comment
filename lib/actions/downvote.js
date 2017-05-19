import {TYPES} from './types';
import Api from '../api';



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