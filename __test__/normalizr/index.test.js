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
        assert.ok(data.hasOwnProperty("result"));
        assert.ok(data.hasOwnProperty("entities"));
        const entities=data.entities;
        assert.ok(entities.hasOwnProperty("users"));
        assert.ok(entities.hasOwnProperty("comments"));
        const users=entities.users;
        const comments=entities.comments;
        assert.equal(Object.keys(users).length,authorIds.length,`用户个数必须一致`);
    });

    it("test 2",function(){
        const comments=[
            {
                id: 1,
                content: '2342432423',
                upvotes: 1,
                downvotes: 0,
                authorId: 1,
                scope: 'post',
                topicId: 1,
                replyTo: null,
                replyUnder: null,
                createdAt: '2017-08-06T08:40:46.000Z',
                updatedAt: '2017-08-06T08:41:41.000Z',
                author_id: 1,
                author: {
                    id: 1,
                    username: 'root',
                    email: 'itminus@hotmail.com',
                    password: 'blablabla_hash',
                    roles: '[]',
                    state: 'active',
                    createdAt: '2017-07-26T13:09:02.000Z',
                    updatedAt: '2017-07-26T13:09:02.000Z',
                    name: 'root'
                }
            },
            {
                id: 2,
                content: '6666666666666666666666666666',
                upvotes: 1,
                downvotes: 0,
                authorId: 1,
                scope: 'post',
                topicId: 1,
                replyTo: null,
                replyUnder: null,
                createdAt: '2017-08-06T08:41:26.000Z',
                updatedAt: '2017-08-06T08:41:34.000Z',
                author_id: 1,
                author: {
                    id: 1,
                    username: 'root',
                    email: 'itminus@hotmail.com',
                    password: 'blablabla_hash',
                    roles: '[]',
                    state: 'active',
                    createdAt: '2017-07-26T13:09:02.000Z',
                    updatedAt: '2017-07-26T13:09:02.000Z',
                    name: 'root'
                }
            },
            {
                id: 3,
                content: '111111',
                upvotes: 0,
                downvotes: 0,
                authorId: 1,
                scope: 'post',
                topicId: 1,
                replyTo: null,
                replyUnder: null,
                createdAt: '2017-08-06T10:53:37.000Z',
                updatedAt: '2017-08-06T10:53:37.000Z',
                author_id: 1,
                author: {
                    id: 1,
                    username: 'root',
                    email: 'itminus@hotmail.com',
                    password: 'blablabla_hash',
                    roles: '[]',
                    state: 'active',
                    createdAt: '2017-07-26T13:09:02.000Z',
                    updatedAt: '2017-07-26T13:09:02.000Z',
                    name: 'root'
                }
            },
            {
                id: 15,
                content: 'xfsdfsdfd',
                upvotes: 0,
                downvotes: 0,
                authorId: 1,
                scope: 'post',
                topicId: 1,
                replyTo: null,
                replyUnder: null,
                createdAt: '2017-08-06T13:46:52.000Z',
                updatedAt: '2017-08-06T13:46:52.000Z',
                author_id: 1,
                author: {
                    id: 1,
                    username: 'root',
                    email: 'itminus@hotmail.com',
                    password: 'blablabla_hash',
                    roles: '[]',
                    state: 'active',
                    createdAt: '2017-07-26T13:09:02.000Z',
                    updatedAt: '2017-07-26T13:09:02.000Z',
                    name: 'root'
                }
            },
            {
                id: 16,
                content: 'fsfsdfsdf',
                upvotes: 0,
                downvotes: 0,
                authorId: 1,
                scope: 'post',
                topicId: 1,
                replyTo: null,
                replyUnder: null,
                createdAt: '2017-08-06T13:46:55.000Z',
                updatedAt: '2017-08-06T13:46:55.000Z',
                author_id: 1,
                author: {
                    id: 1,
                    username: 'root',
                    email: 'itminus@hotmail.com',
                    password: 'blablabla_hash',
                    roles: '[]',
                    state: 'active',
                    createdAt: '2017-07-26T13:09:02.000Z',
                    updatedAt: '2017-07-26T13:09:02.000Z',
                    name: 'root'
                }
            },
            {
                id: 17,
                content: 'xfvdfsdfsd',
                upvotes: 0,
                downvotes: 0,
                authorId: 1,
                scope: 'post',
                topicId: 1,
                replyTo: null,
                replyUnder: null,
                createdAt: '2017-08-06T13:46:57.000Z',
                updatedAt: '2017-08-06T13:46:57.000Z',
                author_id: 1,
                author: {
                    id: 1,
                    username: 'root',
                    email: 'itminus@hotmail.com',
                    password: 'blablabla_hash',
                    roles: '[]',
                    state: 'active',
                    createdAt: '2017-07-26T13:09:02.000Z',
                    updatedAt: '2017-07-26T13:09:02.000Z',
                    name: 'root'
                }
            },
            {
                id: 18,
                content: 'sfsfdsfs',
                upvotes: 1,
                downvotes: 0,
                authorId: 1,
                scope: 'post',
                topicId: 1,
                replyTo: null,
                replyUnder: null,
                createdAt: '2017-08-06T13:46:59.000Z',
                updatedAt: '2017-08-10T14:10:49.000Z',
                author_id: 1,
                author: {
                    id: 1,
                    username: 'root',
                    email: 'itminus@hotmail.com',
                    password: 'blablabla_hash',
                    roles: '[]',
                    state: 'active',
                    createdAt: '2017-07-26T13:09:02.000Z',
                    updatedAt: '2017-07-26T13:09:02.000Z',
                    name: 'root'
                }
            },
            {
                id: 19,
                content: 'xdcfgsdfreyughr',
                upvotes: 0,
                downvotes: 0,
                authorId: 1,
                scope: 'post',
                topicId: 1,
                replyTo: null,
                replyUnder: null,
                createdAt: '2017-08-06T13:47:02.000Z',
                updatedAt: '2017-08-06T13:47:02.000Z',
                author_id: 1,
                author: {
                    id: 1,
                    username: 'root',
                    email: 'itminus@hotmail.com',
                    password: 'blablabla_hash',
                    roles: '[]',
                    state: 'active',
                    createdAt: '2017-07-26T13:09:02.000Z',
                    updatedAt: '2017-07-26T13:09:02.000Z',
                    name: 'root'
                }
            },
            {
                id: 20,
                content: 'fytrytryt',
                upvotes: 1,
                downvotes: 0,
                authorId: 1,
                scope: 'post',
                topicId: 1,
                replyTo: null,
                replyUnder: null,
                createdAt: '2017-08-06T13:47:04.000Z',
                updatedAt: '2017-08-10T14:31:35.000Z',
                author_id: 1,
                author: {
                    id: 1,
                    username: 'root',
                    email: 'itminus@hotmail.com',
                    password: 'blablabla_hash',
                    roles: '[]',
                    state: 'active',
                    createdAt: '2017-07-26T13:09:02.000Z',
                    updatedAt: '2017-07-26T13:09:02.000Z',
                    name: 'root'
                }
            },
            {
                id: 21,
                content: 'jjjjhdf',
                upvotes: 0,
                downvotes: 0,
                authorId: 1,
                scope: 'post',
                topicId: 1,
                replyTo: null,
                replyUnder: null,
                createdAt: '2017-08-06T13:47:07.000Z',
                updatedAt: '2017-08-06T13:47:07.000Z',
                author_id: 1,
                author: {
                    id: 1,
                    username: 'root',
                    email: 'itminus@hotmail.com',
                    password: 'blablabla_hash',
                    roles: '[]',
                    state: 'active',
                    createdAt: '2017-07-26T13:09:02.000Z',
                    updatedAt: '2017-07-26T13:09:02.000Z',
                    name: 'root'
                }
            }
        ];
        const data=normalize(comments,[commentEntity]);
        assert.equal(data.entities.comments[1].author,1);
    });


});