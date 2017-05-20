const config=require('../config');
const Sequelize=require('sequelize');



const database=config.database;
const sequelize=new Sequelize(
    database.dbname,
    database.username,
    database.password,
    {
        host:database.host,
        dialect:database.dialect,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
    }
);


const user=sequelize.import('./user.js');
const role=sequelize.import('./role.js');

const comment=sequelize.import('./comment.js');
const topicUserOpinion=sequelize.import('./topic-user-opinion.js');

comment.belongsTo(user,{foreignKey:'author_id',as:'author'});
topicUserOpinion.belongsTo(user,{foreignKey:'user_id'});


module.exports={
    user,
    role,
    comment,
    topicUserOpinion,
    sequelize,
};