const assert=require('assert');
import {commentEntity,normalize} from '../../lib/normalizr';


describe("test《normalizr/entity.js》",function(){
    const originalData=[
        {id:1,content:'wwwwwwww1',author:{id:999,name:'joker9'}},
        {id:2,content:'wwwwwwww2',author:{id:999,name:'joker9'}},
        {id:3,content:'wwwwwwww3',author:{id:998,name:'joker8'}},
        {id:4,content:'wwwwwwww4',author:{id:997,name:'joker7'}},
        {id:5,content:'wwwwwwww4',author:{id:996,name:'joker5'}},
        {id:6,content:'wwwwwwww4',author:{id:995,name:'joker7'}}, // author 有重名现象
    ];
    const authorIds=[];
    originalData.forEach((d,i)=>{
        if(authorIds.indexOf(d.author.id) ==-1 ){
            authorIds.push(d.author.id);
        }
    });

    it("test entity",function(){
        const data = normalize(originalData, [commentEntity]);
        console.log(data);
        assert.ok(data.hasOwnProperty("result"));
        assert.ok(data.hasOwnProperty("entities"));
        const entities=data.entities;
        assert.ok(entities.hasOwnProperty("users"));
        assert.ok(entities.hasOwnProperty("comments"));
        const users=entities.users;
        const comments=entities.comments;
        assert.equal(Object.keys(users).length,authorIds.length,`用户个数必须一致`);
    });


});