import {config} from '../config';

const REPLY_PAGE_SIZE=config.replyPageSize;
const COMMENT_PAGE_SIZE=config.commentPageSize;



/**
 * 获取当前用户信息
 */
export function fetchCurrentUserProfile(){
    return fetch(`/account/profile/me?rand=${Math.random()}`,{
        method:'get',
        credentials:'same-origin',
        headers:{
            "Content-Type":"application/json",
        },
    })
    .then(resp=>resp.json()) ;
}



/**
 * 根据指定条件，从服务器获取顶级评论列表
 * @param {String} scope 主题域
 * @param {Number} topicId 主题ID
 * @param {Number} replyTo 所回复评论的ID，即向哪个评论回复
 * @param {Number} page 评论分页页码
 * @param {Number} size 评论分页每页数量
 */
export function fetchCommentList(scope,topicId,page=1,size=COMMENT_PAGE_SIZE){
    return fetch("/comment/list",{
        method:'post',
        credentials:'same-origin',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({scope, topicId,page, size, }),
    })
    .then(resp=>resp.json())
    .then(result=>{
        const comments=result.rows.map(c=>{
            c.author.name=c.author.username;
            return c;
        });
        const count=result.count;
        return {comments,count};
    });
}


/**
 * 
 * @param {String} scope 
 * @param {String} topicId 
 * @param {String} replyUnder 
 * @param {String} page 
 * @param {String} size 
 */
export function fetchReplyListUnder(scope,topicId,replyUnder,page=1,size=REPLY_PAGE_SIZE){
    
    return fetch("/comment/list",{
        method:'post',
        credentials:'same-origin',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({scope, topicId, replyUnder,page, size, }),
    })
    .then(resp=>resp.json())
    .then(result=>{
        const comments=result.rows.map(c=>{
            c.author.name=c.author.username;
            return c;
        });
        const count=result.count;
        return {comments,count};
    });
}


/**
 * 获取某页(指评论分页)的次级回复列表
 * @param {String} scope 
 * @param {Number} topicId 
 * @param {Number} page 
 * @param {Number} size 
 */
export function fetchReplyListOfPage(scope,topicId,page=1,size=COMMENT_PAGE_SIZE,replyPageSize=REPLY_PAGE_SIZE){
    return fetch("/comment/list/reply-list-of-page",{
        method:'post',
        credentials:'same-origin',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({scope, topicId, page, size, replyPageSize}),
    })
    .then(resp=>resp.json());
}


/**
 * 创建新的评论或者回复
 * @param {String} scope 
 * @param {Number} topicId 
 * @param {Number} replyTo 
 * @param {String} content 
 */
export function create(scope,topicId,replyTo,content){
    return fetch(`/comment/new`,{
        method:'post',
        credentials:'same-origin',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({ scope, topicId, replyTo,content})
    })
    .then(resp=>resp.json())
}



/**
 * 投票赞成某评论
 * @param {Number} commentId 
 */
export function upvote(commentId){
    return fetch("/comment/upvote",{
        method:'post',
        credentials:'same-origin',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({id:commentId}),
    })
    .then(resp=>resp.json())
    .then(info=>{
        if(!info){
            return false;
        }else{
            return info[0];
        }
    });
}



/**
 * 投票反对某评论
 * @param {Number} commentId 
 */
export function downvote(commentId){
    return fetch("/comment/downvote",{
        method:'post',
        credentials:'same-origin',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({id:commentId}),
    })
    .then(resp=>resp.json())
    .then(info=>{
        if(!info){
            return false;
        }else{
            return info[0];
        }
    });
}

export default {
    fetchCurrentUserProfile,
    fetchCommentList,
    fetchReplyListOfPage,
    fetchReplyListUnder,
    create,
    upvote,
    downvote
};