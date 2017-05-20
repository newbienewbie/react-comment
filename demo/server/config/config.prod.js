
const config={};


config.env='prod';

let _db={
    dialect:'mysql',
    host:process.env.OPENSHIFT_MYSQL_DB_HOST,
    port:process.env.OPENSHIFT_MYSQL_DB_PORT,
    username:process.env.OPENSHIFT_MYSQL_DB_USERNAME,
    password:process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
    dbname:process.env.OPENSHIFT_APP_NAME,
    charset:'utf-8',
};     
config.database=_db;


module.exports = config;