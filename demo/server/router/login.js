const express=require('express');
const domain=require('../domain');

const router=express.Router();

// fake login
router.get('/fake',function(req,res){
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

module.exports=router;