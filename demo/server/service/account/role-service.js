//目前的实现依赖于session
const domain=require('../../domain');


/**
 * 列出所有的角色集合
 */
function listAll(){
    return domain.role.findAll();
}


/**
 * 从数据库中加载指定账户的角色信息到SESSION,
 *     成功则resolve({username,roles})
 *     失败则reject(reason)
 */
function load(username){
    return new Promise(function(resolve,reject){
        domain.user.find({
            where: { username: username }
        }).then( (user)=>{
            if (user) {
                req.session.userid=user.id;
                req.session.username = user.username;
                req.session.roles = JSON.parse(user.roles) || [];
                resolve({
                    username:username,
                    roles:user.roles,
                });
            } else {
                reject(`the user with ${username} not found`);
            }
        });
    });
}


/**
 * 更新用户的角色
 */
function update(username,roles=[]){
    return new Promise(function(resolve,reject){
        domain.user.update(
            { roles:JSON.stringify(roles) },
            { where:{ username}}
        ).then(resolve,reject)
        .catch(reject);
    });
}


module.exports={
    listAll,
    load,
    update,
};