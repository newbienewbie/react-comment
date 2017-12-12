const express=require('express');
const bodyParser=require('body-parser');
const commentService=require('../service/comment');


const router=express.Router();

router.post('/list/reply-list-of-page',bodyParser.json(),function(req,res,next){
    let {scope,topicId,page,size,replyPageSize}=req.body;
    topicId=parseInt(topicId);
    page=page?parseInt(page):1;
    page=page>0?page:1;
    size=size?parseInt(size):10;
    size=size>0?size:10;
    replyPageSize=parseInt(replyPageSize);
    replyPageSize=replyPageSize>0?replyPageSize:10;
    const currentUserId=req.session.userid;
    return commentService.listAllReplies(scope,topicId,page,size,replyPageSize,currentUserId)
        .then(list=>{
            res.end(JSON.stringify(list));
        });
});


/**
 * 根据指定分页条件，获取回复于某个replyTo的相应评论列表或者回复列表
 * 如果未指定replyUnder，则
 */
router.post('/list',bodyParser.json(),function(req,res,next){
    let {scope,topicId,page,size,replyTo,replyUnder}=req.body;
    topicId=parseInt(topicId);
    page=page?parseInt(page):1;
    page=page>0?page:1;
    size=size?parseInt(size):10;
    size=size>0?size:10;
    if(!replyTo){
        replyTo=null;
    }
    const currentUserId=req.session.userid;
    let p=null;
    // 如果指定了 replyUnder 且 不为 null，则意味着是要获取某个顶级评论下的所有回复
    if(!!replyUnder){
        p=commentService.listByReplyUnder(scope,topicId,replyUnder,page,size,currentUserId);
    }
    else{
        p=commentService.listByTopicId(scope,topicId,replyTo,page,size,currentUserId)
    }

    return p.then(result=>{
            res.end(JSON.stringify(result));
        });
});



router.post('/new',bodyParser.json(),function(req,res,next){
    const {scope,topicId,replyTo,content}=req.body;
    const authorId=req.session.userid;
    if(!content || !topicId || !authorId){ 
        const info={msg:'必须提供content、topicId、authorId',status:'FAIL'};
        res.end(JSON.stringify(info));
        return;
    }
    const info={scope,topicId,replyTo,content,authorId};
    return commentService.createCommentOrReply(info)
        .then(
            c=>{
                res.end(JSON.stringify(c));
            },
            reason=>{
                res.end(JSON.stringify({status:'fail',msg:reason}));
            }
        );
});

router.post('/upvote/cancel',bodyParser.json(),function(req,res,next){
    const {id}=req.body;
    const userId=req.session.userid;
    if(!id || !userId){ 
        const info={msg:'id、userId must be provided',status:'FAIL'};
        res.end(JSON.stringify(info));
        return;
    }
    commentService.cancelLike(userId,id)
        .then(i=>{
            res.end(JSON.stringify(i));
        })
    
});

router.post('/upvote',bodyParser.json(),function(req,res,next){
    const {id}=req.body;
    const userId=req.session.userid;
    if(!id || !userId){ 
        const info={msg:'id、userId must be provided',status:'FAIL'};
        res.end(JSON.stringify(info));
        return;
    }
    commentService.like(userId,id)
        .then(i=>{
            res.end(JSON.stringify(i));
        })
    
});

router.post('/downvote/cancel',bodyParser.json(),function(req,res,next){
    const {id}=req.body;
    const userId=req.session.userid;
    if(!id || !userId){ 
        const info={msg:'id、userId must be provided',status:'FAIL'};
        res.end(JSON.stringify(info));
        return;
    }
    commentService.cancelHate(userId,id)
        .then(i=>{
            res.end(JSON.stringify(i));
        })
    
});

router.post('/downvote',bodyParser.json(),function(req,res,next){
    const {id}=req.body;
    const userId=req.session.userid;
    if(!id || !userId){ 
        const info={msg:'id、userId must be provided',status:'FAIL'};
        res.end(JSON.stringify(info));
        return;
    }
    commentService.hate(userId,id)
        .then(i=>{
            res.end(JSON.stringify(i));
        })
    
});

module.exports=router;