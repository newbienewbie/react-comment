const path=require('path');
const http=require('http');
const express=require('express');
const sess=require('./service/session/session');


const app=express();

// 配置session
app.use(sess);


app.use("/comment",require('./router/comment'));
app.use("/account",require('./router/login'));
app.use("/",require('./router/index'));

const PORT=4000;
http.createServer(app)
    .listen(PORT,function(){
        console.log(`server listens on ${PORT}`);
    });