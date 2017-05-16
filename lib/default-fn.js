
/**
 * 从服务器获取评论列表
 * @param {String} scope 主题域
 * @param {Number} topicId 主题ID
 * @param {Number} replyTo 所回复评论的ID，即向哪个评论回复
 * @param {Number} page 评论分页页码
 * @param {Number} size 评论分页每页数量
 */
export function fetchCommentList(scope,topicId,replyTo,page=1,size=8){
    return fetch("/comment/list",{
        method:'post',
        credentials:'same-origin',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({scope, topicId, replyTo,page, size, }),
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
 * 提交创建评论的请求
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
 * 投票赞成处理器
 * @param {Number} commentId 
 */
export function onUpvote(commentId){
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
 * 投票反对处理器
 * @param {Number} commentId 
 */
export function onDownvote(commentId){
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




let _fns={ fetchCommentList, create, onUpvote, onDownvote, };


export function configFn(fns){
    return Object.assign(_fns,fns);
}