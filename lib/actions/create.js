import Api from '../api';
import {TYPES} from './types';



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
            .then(_=>{
                dispatch(created(_));
            })
    };
}

export function created(_){
    return {
        type:TYPES.created,
    };
}


