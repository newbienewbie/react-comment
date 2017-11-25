const express=require('express');
const domain=require('../domain');
const userService=require('../service/account/user-service');

const router=express.Router();

// fake login
router.get('/login/fake',function(req,res){
    const {redirectUrl}=req.query;
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
            _=>res.redirect(redirectUrl),
            _=>res.redirect(redirectUrl)
        );
});


/**
 * 当前用户的profile
 */
router.use('/profile/me',function(req,res,next){
    const userId=req.session.userid;
    if(!userId){
        res.end(JSON.stringify({status:"FAIL",message:'wrong userId id'}));
        return;
    }
    userService.findById(userId)
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