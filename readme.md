# react-comment

前端评论组件，支持分页。


## 安装与使用

### 安装

```
npm install react-coment
```

### 样式处理

出于通用性考虑，目前入口文件`index.js`没有载入`css`，如果想要使用预定义的样式，需要手工载入。
* 如果使用`webpack`打包`css`，只需要`require('react-comment/dist/style.css')`
* 如果使用了其他技术，可以把`/dist/style.css`拷贝到相应目录下通过`link`链接。

当然，你完全可以使用自己的样式。

### 使用

#### 基本属性

* topicId ：评论对应的主题ID
* scope : 评论所述的域，可以用来分类

#### 交互属性：

由于`react-comment`只是个前端，需要向后端请求数据，所以以下行为属性需要动态注入：

* 获取评论列表: `fetchCommentList(scope,topicId,page=1,size=8)=>Promise<{comments,count}>`
* 创建新评论: `create(scope,topicId,content)=>Promise<any>`
* 投票支持某条评论: `onUpvote(commentId)=>Promise<Comment>或 Promise<false>`
* 投票反对某条评论 `onDownvote(commentId)=>Promise<Comment>或Promise<false>`:

默认情况下，

1. 预定义的`fetchComentList(scope,topicId,page,size)` 发起的请求为：
```
POST "/comment/list"
{
    credentials:'same-origin',
    headers:{
        "Content-Type":"application/json",
    },
    body:JSON.stringify({scope, topicId, page, size, }),
})
```
并假定服务器返回`{rows:comments,count:count}`对象，并将之转换为`{comments,count}`。

2. 预定义的`create(scope,topicId,content)=>Promise<any>` 发起的请求为:
```
POST `/comment/new`
{
    credentials:'same-origin',
    headers:{
        'Content-Type':'application/json',
    },
    body:JSON.stringify({ scope, topicId, content })
}
```
并假定服务器返回评论信息组成的数组

3. 预定义的`onUpvote(commentId)`发起的请求为：
```
POST "/comment/upvote"
{
    method:'post',
    credentials:'same-origin',
    headers:{
        "Content-Type":"application/json",
    },
    body:JSON.stringify({id:commentId}),
}
```

4. 预定义的`onDownvote(commentId)`发起的请求为：
```
POST "/comment/downvote"
{
    method:'post',
    credentials:'same-origin',
    headers:{
        "Content-Type":"application/json",
    },
    body:JSON.stringify({id:commentId}),
})
```

#### demo
```JavaScript
import React from 'react';
import {Comment} from 'react-comment';
import {Ebook} from './ebook';


export const Detail=React.createClass({

    render:function () {
        return (<div>
            <Ebook id={this.props.params.id}/>
            <Comment topicId={this.props.params.id} scope="ebook"/>
        </div>);
    }
});

export default Detail;
```



## 开发

### 基本原理

* 使用`babel`编译`lib/`文件夹下的所有`JavaScript`文件到`dist/`文件夹下
* 使用`less`预处理`lib/style.less`，渲染后存为`dist/style.css`

### 目录介绍

基本结构：
```
index.js            # 入口文件
lib/                # 源码文件夹，
dist/               # 发布文件夹
```

注意，`dist/`会被`git`忽略，但是不会被`npm`仓库忽略。

### 构建

从命令行构建
```
> npm run build
```

此命令等效于
```
> npm run babel
> npm run lessc
```
