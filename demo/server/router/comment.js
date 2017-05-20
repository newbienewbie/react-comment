const express=require('express');
const bodyParser=require('body-parser');
const commentService=require('../service/comment');


const router=express.Router();

router.post('/list/reply',bodyParser.json(),function(req,res,next){
    let {scope,topicId,page,size,replyPageSize}=req.body;
    topicId=parseInt(topicId);
    page=page?parseInt(page):1;
    page=page>0?page:1;
    size=size?parseInt(size):10;
    size=size>0?size:10;
    replyPageSize=parseInt(replyPageSize);
    replyPageSize=replyPageSize>0?replyPageSize:10;
    return commentService.listAllReplies(scope,topicId,page,size,replyPageSize)
        .then(list=>{
            res.end(JSON.stringify(list));
        });
});

router.post('/list',bodyParser.json(),function(req,res,next){
    let {scope,topicId,page,size,replyTo}=req.body;
    topicId=parseInt(topicId);
    page=page?parseInt(page):1;
    page=page>0?page:1;
    size=size?parseInt(size):10;
    size=size>0?size:10;
    if(!replyTo){
        replyTo=null;
    }
    commentService.listByTopicId(scope,topicId,replyTo,page,size)
        .then(result=>{
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