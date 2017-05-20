const domain=require('../../domain');
const userOpinion=require('../topic-user-opinion');

function create(comment){
    return domain.comment.create(comment);
}

/**
 * 创建顶级评论或者次级回复
 * @param {Comment} info 
 */
function createCommentOrReply(info){
    const {authorId,content,scope,topicId,replyTo}=info;
    // 如果有指定 reply to,说明是个次级回复
    if(!!replyTo){
        return findById(replyTo)
            .then(comment=>{
                if(!comment){return Promise.reject(`there's no comment responding to your reply`) ;}
                // 找到记录的作者，然后发消息给作者
                // todo: 发消息
                // 获取记录的 reply_under,
                let replyUnder=null;
                // 如果 reply_under 不为 null，说明该记录并非顶级评论，且 reply_under 已经设置好，故其及其任意级别的子回复的reply_under 为该评论的reply_under
                if(!!comment.replyUnder){
                    replyUnder= comment.replyUnder
                }
                // 否则，说明该记录为顶级评论，故其子回复的reply_under 为 该评论的id
                else{
                    replyUnder=comment.id;
                }
                return replyUnder;
            })
            .then(
                replyUnder=>{
                    const comment={authorId, content,scope, topicId,replyTo, replyUnder };
                    return create(comment); 
                },
                reason=>{
                    return Promise.reject(reason); 
                }
            );
    }
    // 否则，说明是个顶级评论
    else{
        const comment={ authorId,content,scope,topicId,replyTo:null,replyUnder:null };
        return create(comment);
    }

}



function remove(id){
    return domain.comment.findById(id).then(c=>{
        return c.destroy();
    });
}


/**
 * 更新
 * @param {*} comment 
 */
function update(comment){
    const _comment=JSON.parse(JSON.stringify(comment));
    const id=_comment.id;
    delete _comment.id;
    
    return domain.comment.update(
        _comment,
        {where:{ id:_comment.id, }}
    );
}


function findById(id){
    return domain.comment.findById(id);
}


/**
 * 根据主题列举出评论
 * @param {String} scope 
 * @param {Number} topicId 
 * @param {Number} replyTo 
 * @param {Number} page 
 * @param {Number} size 
 * @return {Object} {rows:[],count:null}
 */
function listByTopicId(scope,topicId,replyTo=null,page=1,size=10){
    return domain.comment.findAndCount({
        where:{scope:scope,topicId:topicId,replyTo:replyTo},
        limit:size,
        offset:(page-1)*size,
        order:[
            ['createdAt','desc'],
        ],
        include:[
            {model:domain.user,as:'author'}
        ],
    });
}


function listByReplyTo(replyTo,page,size){

}


/**
 * 列出相应分页条件下的所有次级回复（不含顶级评论）,使用场景为首屏渲染时列出各个回复
 * @param {String} scope 
 * @param {Number} topicId 
 * @param {Number} page 
 * @param {Number} size 
 * @param {Number} replySize 
 */
function listAllReplies(scope,topicId,page=1,size=10,replySize=10){

    // 筛选出指定分页条件下的所有顶级评论的某分页下的次级回复
    const rows= domain.sequelize.query(
        `select t.*,row_number from
            (select 
                x.id as id,x.content,x.upvotes,x.downvotes,x.author_id as authorId,x.scope as scope,x.topic_id as topicId,x.reply_to as replyTo,x.reply_under as replyUnder,x.createdAt as createdAt,x.updatedAt as updatedAt
                ,IF(@partition=x.reply_under,@rank:=@rank+1,@rank:=1) as row_number
                ,@partition:=x.reply_under as under
            from 
                (select r.*
                    from 
                        (select * from comment
                            where comment.reply_to is null
                                and comment.reply_under is null
                                and scope=:scope
                                and topic_id=:topicId
                            order by createdAt desc
                            limit :offset , :commentSize
                        )as c  -- 特定scope及topicId下的顶级评论
                    inner join comment as r 
                    on r.reply_under = c.id
                ) as x , -- 特定scope及topicId的所有顶级评论下的全部回复
                (select @rank:=0,@partition:=null)as _temp_var
            order by reply_under)
            as t
            where row_number <= :replySize `,
            {
                replacements:{
                    scope,
                    topicId,
                    offset:(page-1)*size,
                    commentSize:size,
                    replySize:replySize,
                },
                type: domain.sequelize.QueryTypes.SELECT  
            }
    );
    // 筛选出指定分页条件下的所有顶级评论的次级回复的计数
    const counts=domain.sequelize.query(
        `
        select r.reply_under as replyUnder,count(r.id) as count
        from 
            (select * from comment
                where comment.reply_to is null
                    and comment.reply_under is null
                    and scope=:scope
                    and topic_id=:topicId
                order by createdAt desc
                limit :offset , :commentSize
            )as c  -- 特定scope及topicId下的顶级评论
        inner join comment as r 
        on r.reply_under = c.id
        group by r.reply_under
        `,
        {
            replacements:{
                scope,
                topicId,
                offset:(page-1)*size,
                commentSize:size,
                replySize:replySize,
            },
            type: domain.sequelize.QueryTypes.SELECT             
        }
    );
    return Promise.all([rows,counts])
        .then(results=>{
           const rows=results[0];
           const counts=results[1];
           // 由 replies 组成的map
           const repliesList={};
           counts.forEach(e=>{
               const id=e.replyUnder;
               const replies=rows.filter(r=>r.replyUnder==id);
               const count=e.count;
               repliesList[id]={ 
                   rows:replies, 
                   count, 
               };
           });
           return repliesList;
        });
}


/**
 * 在表达意见之前的基本检查，返回Promise<false>则表示可以不表达意见;
 * 否则，返回Promise<Comment>， comment 是commentId对应的对象
 * @param {Number} userId 
 * @param {Number} commentId 
 * @return {Promise<Boolean>}
 */
function preOpinion(userId,commentId,opinions=["like","hate"]){
    return domain.comment.findById(commentId)
        .then(comment=>{
            if(!comment){
                return false;
            }else{
                return userOpinion.hasAnyOpinionOf("comment",commentId,userId,opinions)
                    .then(has=>{
                        if(has){
                            return false;
                        }else{
                            return comment;
                        }
                    });
            }
        });
}

/**
 * 取消意见之前的必要检查，返回Promise<false>则表示不可取消，否则返回Promise<comment>
 * @param {Number} userId 
 * @param {Number} commentId 
 * @param {String} opinion 
 */
function preCancelOpinion(userId,commentId,opinion="like"){
    return domain.comment.findById(commentId)
        .then(comment=>{
            if(!comment){
                return false;
            }else{
                return userOpinion.hasAnyOpinionOf("comment",commentId,userId,["like"])
                    .then(has=>{
                        if(has){
                            return comment;
                        }else{
                            return false;
                        }
                    });
            }
        });
}

/**
 * 用户喜欢
 * @param {Number} userId 
 * @param {Number} commentId 
 * @return {Promise}
 */
function like(userId,commentId){
    return preOpinion(userId,commentId)
        .then(comment=>{
            if(!!comment){
                return Promise.all([
                    comment.increment('upvotes').then(c=>{
                        return findById(c.id);
                    }),
                    userOpinion.like("comment",commentId,userId)
                ]);
            }else{
                return false;
            }
        });
}


/**
 * 用户取消喜欢
 * @param {Number} userId 
 * @param {Number} commentId 
 * @return {Promise}
 */
function cancelLike(userId,commentId){
    return preCancelOpinion(userId,commentId,"like")
        .then(comment=>{
            if(!!comment){
                return Promise.all([
                    comment.decrement('upvotes').then(c=>{
                        return findById(c.id);
                    }),
                    userOpinion.cancelLike("comment",commentId,userId)
                ]);
            }else{
                return false;
            }
        });
}


/**
 * 用户讨厌
 * @param {Number} userId 
 * @param {Number} commentId 
 * @return {Promise}
 */
function hate(userId,commentId){
    return preOpinion(userId,commentId)
        .then(comment=>{
            if(!!comment){
                return Promise.all([
                    comment.increment('downvotes').then(c=>{
                        return findById(c.id);
                    }),
                    userOpinion.hate("comment",commentId,userId),
                ]);
            }else{
                return false;
            }
        });
}


/**
 * 用户取消讨厌
 * @param {Number} userId 
 * @param {Number} commentId 
 * @return {Promise}
 */
function cancelHate(userId,commentId){
    
    return preCancelOpinion(userId,commentId,"hate")
        .then(comment=>{
            if(!!comment){
                return Promise.all([
                    comment.decrement('downvotes').then(c=>{
                        return findById(c.id);
                    }),
                    userOpinion.cancelHate("comment",commentId,userId)
                ]);
            }else{
                return false;
            }
        });
}

module.exports={
    create,createCommentOrReply,remove,update,findById,listByTopicId,listAllReplies,
    like,cancelLike,hate,cancelHate,
};