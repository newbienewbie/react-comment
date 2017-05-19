const path=require('path');
const http=require('http');
const express=require('express');

const app=express();
app.use("/",express.static(path.join(__dirname,"../dist")));

const PORT=4000;
http.createServer(app)
    .listen(PORT,function(){
        console.log(`server listens on ${PORT}`);
    });