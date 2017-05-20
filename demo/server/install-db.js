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
        );
}

/**
 * 确保database 是 utf8 字符集
 */
function ensureUtf8Database(){
    const database=domain.sequelize.config.database;
    return domain.sequelize.query(`alter database ${database} character set utf8;`);
}

install();