const fs=require('fs');
const path=require('path');
const domain=require('./domain/');


/**
 * 安装数据库
 */
function install(){
    return ensureUtf8Database()
        .then(
            ()=>{ return domain.sequelize.sync({ force: true }); },
            (reason)=>{ return Promise.reject(reason); }
        )
        .then(_=>{
            return domain.user.create({
                username:'root',
                email:'itminus@hotmail.com',
                password:'blablabla_hash',
                roles:JSON.stringify([]),
                state:'active',
            });
        })
        .then(_=>{
            console.log(`done`);
        });
}

/**
 * 确保database 是 utf8 字符集
 */
function ensureUtf8Database(){
    const database=domain.sequelize.config.database;
    return domain.sequelize.query(`alter database ${database} character set utf8;`);
}

install();