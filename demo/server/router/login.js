const express=require('express');
const domain=require('../domain');
const userService=require('../service/account/user-service');

const router=express.Router();

// fake login
router.get('/login/fake',function(req,res){
    return domain.user.find({
            where: { username: 'root'}
        }).then( user=>{
            if (user) {
                req.session.userid=user.id;
                req.session.username = user.username;
                req.session.roles = JSON.parse(user.roles) || [];
                return {
                    username:user.username,
                    roles:user.roles,
                };
            } else {
                return Promise.reject(`the user with ${username} not found`);
            }
        })
        .then(
            _=>res.end(JSON.stringify(_)),
            _=>res.end(JSON.stringify(_))
        );
});


/**
 * 当前用户的profile
 */
router.use('/profile/me',function(req,res,next){
    const authorId=req.session.userid;
    userService.findById(authorId)
        .then(user=>{
            user=JSON.parse(JSON.stringify(user));
            delete user.password;
            res.end(JSON.stringify(user));
        })
        .catch(e=>{
            console.log(`以id: ${id} 读取用户错误`,e);
        })
});


module.exports=router;