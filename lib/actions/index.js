import Api from '../api';
import {TYPES} from './types';
import {config} from '../config';
import {normalize,commentEntity,replyEntity} from '../normalizr';
import {deepcopy} from '../utils';

export {TYPES};


const COMMENT_PAGE_SIZE=config.commentPageSize;
const REPLY_PAGE_SIZE=config.replyPageSize;



/**
 * 获取当前用户信息
 */
export function fetchCurrentUserProfile(){
    return dispatch=>{
        return Api.fetchCurrentUserProfile()
            .then(info=>{
                return dispatch(fetchCurrentUserProfileSucceeded(info));
            });
    };
}


/**
 * 获取用户信息成功
 * @param {*} info 
 */
export function fetchCurrentUserProfileSucceeded(info){
    return {
        type:TYPES.fetchCurrentUserProfileSucceeded,
        info,
    };
}


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
                const repliesDict=deepcopy(info);
                // add users to store
                var flatReplyList=[];
                Object.keys(repliesDict).forEach(id=>{
                    const replies=repliesDict[id].rows;

                    // add user to flatReplyList 
                    const _replies=deepcopy(replies);
                    for(var i=1; i<_replies.length;i++ ){
                        flatReplyList.push(_replies[i]);
                    }

                    // update author obj to author_id integer
                    updateAuthorWithAuthorIdWithinComments(replies);
                });
                const authorList=flatReplyList.map(r=>r.author);
                dispatch(recevieAuthorList(authorList));


                // 触发:收到当前评论分页下的所有回复
                const received=fetchReplyListOfPageReceived(repliesDict);
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
                const data=normalize(comments,[commentEntity]);
                // add users to store
                const authorList=Object.values(data.entities.users);
                dispatch(recevieAuthorList(authorList));

                // 触发：获取评论的回复成功
                updateAuthorWithAuthorIdWithinComments(comments);
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
            .then(function(info){
                const {comments,count}=info;

                //增加作者到用户
                const data=normalize(comments,[commentEntity]);
                const authorList=Object.values(data.entities.users);
                dispatch(recevieAuthorList(authorList));

                // 修改comment.author为 用户id
                updateAuthorWithAuthorIdWithinComments(comments);
                // 触发动作<收到评论列表>
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
                dispatch(fetchCommentList(scope,topicId,page,size))
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


/**
 * 创建回复，如果不指定replyTo参数，则会用作创建顶级评论
 * @param {String} scope 
 * @param {Number} topicId 
 * @param {Number} replyTo 
 * @param {String} content 
 */
export function createReply(scope,topicId,replyTo,content){
    return dispatch=>{
        return Api.create(scope,topicId,replyTo,content)
            .then(reply=>{
                if(reply.status && reply.status=="FAIL"){
                    dispatch(createReplyFailed(reply));
                }else{
                    dispatch(createReplySucceeded(reply));
                }
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

export function createReplyFailed(info){
    // 愚蠢而简单的提示
    alert(info.msg);
    return {
        type:TYPES.createReplySucceeded,
        info,
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


/**
 * 改变 Reply组件的 ReplyTo属性。
 * 一个 Reply组件下有多个 ReplyItem 和一个 回复表单，
 * 表单可以用于回复于其中任何一个ReplyItem，也可以回复于其父组件——CommentItem 。
 * @param {Number} replyComponentId 
 * @param {Number} replyTo 
 */
export function changeTheReplyToPropOfReplyComponent(replyComponentId,replyTo=null){
    return {
        type:TYPES.changeTheReplyToPropOfReplyComponent,
        replyComponentId,
        replyTo,
    };
}


/**
 * 获取评论的作者，注意，此action不改变store的state
 */
export function fetchAuthorOfComment(commentId){
    return (dispatch, getState) => {
        const state = getState();
        
        const replies= state.reply.replies;

        //todo: return author of reply;
    }
}


/**
 * 收到由一批 **Author** 组成的 Array
 * @param {Array} authorList 
 */
export function recevieAuthorList(authorList){
    return {
        type:TYPES.receiveAuthorList,
        authorList,
    };
}

/**
 * 修改comments及replies (数组) 中的每一个评论，令comment.author =comment.author.id;
 * 注意：会修改comments中每一项的author属性！注意事前深拷贝
 * @param {Array} comments or replies
 */
function updateAuthorWithAuthorIdWithinComments(comments){
    for(let i=0;i<comments.length;i++){
        comments[i].author=comments[i].author.id;
    }   
}