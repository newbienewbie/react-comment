

/**
 * 初始化加载时请求数据
 * @param {String} scope 
 * @param {Number} topicId 
 * @param {Number} replyTo 
 * @param {Number} commentPageSize 
 * @param {Number} replyPageSize 
 */
export function fetchWhenInitialLoading(scope,topicId,replyTo,commentPageSize,replyPageSize){

    const p1 = fetchCommentList(scope, topicId, replyTo, 1, commentPageSize);
    const p2 = fetchReplyList(scope, topicId, 1,commentPageSize, replyPageSize);
    return Promise.all([p1, p2])
        .then(function(results) {
            const _results$ = results[0];
            const comments = _results$.comments;
            const commentsCount = _results$.count;
            const replies = results[1];
            return { comments, commentsCount, replies };
        });
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
 * 获取次级回复列表
 * @param {String} scope 
 * @param {Number} topicId 
 * @param {Number} page 
 * @param {Number} size 
 */
export function fetchReplyList(scope,topicId,page=1,size=10,replyPageSize=10){
    return fetch("/comment/list/reply",{
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
    fetchCommentList,
    fetchReplyList,
    create,
    upvote,
    downvote
};