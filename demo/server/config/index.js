
let env=process.env.NODE_ENV;
if(env == "production" || env=="prod"){
    env="prod";
} else if (env=="develpment" || env=="dev"){
    env="dev";
} else {
    env="dev"
}

const defaultConfig=require('./config.default.json');
const config=require(`./config.${env}.js`);

module.exports=Object.assign({},defaultConfig,config);