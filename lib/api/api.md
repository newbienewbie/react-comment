
* 当评论根组件加载完成 ，则依次触发下列操作:
    1. fetch comment list from server
        * 提取响应中的评论的作者信息，并触发收到authorList动作
        * 触发收到顶级评论列表动作
        * 触发顶级评论页面改变事件
    2. fetch reply list of page
        * 提取响应中的回复的作者信息，并触发收到authorList动作
        * 触发收到次级回复列表动作
    3. fetch current user profile


## User相关接口


### 当前用户Profile

```
GET http://localhost:4000/account/profile/me
```

响应要求的字段：
```
{
    "id":1,
    "username":"root",
    "email":"itminus@hotmail.com",
    "state":"active",
    "avatarUrl":"base64-encoded" || "" || "#",
}
```
如果返回的`avatarUrl`是空串或者`#`，则由客户端自动指定一个内嵌的默认头像。


## 评论及回复相关接口

### 投票接口

请求的URL：
/comment/downvote
/comment/upvote

```
POST /comment/upvote
Content-Type : application/json

{
    id:1
}
```

成功:
```
{
    "id":1,
    "content":"1111",
    "upvotes":2,
    "downvotes":0,
    "authorId":4,
    "scope":"post",
    "topicId":1,
    "replyTo":null,
    "replyUnder":null,
    "createdAt":"2017-12-13T03:16:40.000Z","updatedAt":"2018-09-15T02:47:56.000Z",
    "author_id":4,
    "opinion":"like"
}
```
失败则返回空
```

```

### 创建

不管创建顶级评论，还是创建回复，都是同一个URL，只是根据其中`replyTo` 来判断


例如， 创建顶级评论的请求时，应令`replyTo`为`null`：
```
POST /comment/new
Content-Type : application/json

{    
    "scope":"post",
    "topicId":"1",
    "replyTo":null,
    "content":"hello ,woooooooooooooorld",
}
```


而若要创建回复，必须指定回复的是哪一条评论或者哪一条回复:
```
POST /comment/new
Content-Type : application/json

{
    "scope":"post",           //# 评论归属的域
    "topicId":1,              //# 评论归属的主题
    "replyTo":"1",            //# 是要回复的哪一条评论或者回复？
    "content":"hello ,woooooooooooooorld",
}
```

创建成功，则返回当前回复的基本信息及创建者ID，

```
{
    "scope":"post",
    "topicId":"1",
    "id":9,
    "upvotes":0,
    "downvotes":0,
    "content":"hello ,woooooooooooooorld",
    "replyTo":null,
    "replyUnder":null,
    "updatedAt":"2018-09-15T02:59:18.000Z","createdAt":"2018-09-15T02:59:18.000Z",
    "authorId":1
}
```

失败则返回：
```
{
    "status": "fail",
    "msg":"xxx",
}
```

### 评论列表

请求:
```
POST /comment/list

{
    "scope":"post",
    "topicId":"1",
    "page":1,"size":10
}
```

返回
```
{
    "rows":[
        {
            "id":1, "content":"1111", "upvotes":2, "downvotes":0,
            "scope":"post", "topicId":1, "replyTo":null, "replyUnder":null,"createdAt":"2017-12-13T03:16:40.000Z",
            "updatedAt":"2018-09-15T02:47:56.000Z",

            "authorId":4,
            "author":{
                "id":4,
                "username":"user3",
                "email":"user3@hotmail.com",
                "state":"active",
            },
            "opinion":"like"
        },
        {
            ... 
        },
        {
            ...
        }
    ],
    "count":3
}
```

### 请求某页顶级评论下的首页回复列表

```
POST comment/list/reply-list-of-page


{
    "scope":"post",
    "topicId":"1",
    "page":1,
    "size":10,
    "replyPageSize":6
}
```

回复，一个字典对象，以顶级评论的id为key，返回类似于如下的信息：
{
    "1":{
        rows:[
            {
                id:5,scope,topic,content,replyUnder:1, replyTo:3
                author:{id:'',name:'',},
                opinion:'like'
            }
        ],
        count:5
    },
}
对于没有回复的顶级评论，直接不予响应
