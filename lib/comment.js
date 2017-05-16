import React from 'react';
import 'whatwg-fetch';
import Pagination from 'simple-react-ui/dist/pagination';
import {CommentForm}  from './comment-form';
import {CommentList} from './comment-list';




/**
 * Comment 组件，开箱即用，由评论表单、评论列表、分页三部分构成，可以自定义
 * * fetchCommentList
 * * create
 * * onUpvote 
 * * onDownvote
 * 属性
 */
export class Comment extends React.Component{
    

    constructor(props){
        super(props);
        this.state={
            comments:[
                {id:null,author:{name:'',email:'',avatarUrl:'#',introduction:'',},content:'',createdAt:new Date(),updatedAt:new Date(),upvotes:0,downvotes:0,},
            ],
            count:0,
            page:1,
            size:10,
        };
    }

    componentDidMount(){
        const {scope,topicId,replyTo}=this.props;
        this.props.fetchCommentList(scope,topicId,replyTo,1,this.state.size)
            .then((result)=>{
                const {comments,count}=result;
                this.setState({comments,count});
            });
    }


    render() {
        return (<div>
            <CommentForm replyTo={this.props.replyTo} author={{avatarUrl:'#'}} onSubmit={content=>{
                const {scope,topicId,replyTo}=this.props;
                this.props.create(scope,topicId,replyTo,content)
                    .then(info=>{
                        const {page,size}=this.state;
                        return this.props.fetchCommentList(scope,topicId,replyTo,page,size);
                    }).then((result)=>{
                        const {comments,count}=result;
                        this.setState({comments,count});
                    });
            }} />
            <CommentList comments={this.state.comments} 
                onUpvote={(id)=>{
                    this.props.onUpvote(id).then(info=>{
                        if(!info){alert('每个人只能表达一次赞或踩');}
                        const comment=info;
                        console.log(`comment is `,comment.id);
                        const comments=this.state.comments.slice();
                        comments.forEach(c=>{
                            if(c.id==comment.id){
                                console.log('找到了');
                                c.upvotes=comment.upvotes;
                            }
                        })
                        console.log(comments);
                        this.setState({comments:comments});
                    })
                }} 
                onDownvote={(id)=>{
                    this.props.onDownvote(id).then(info=>{
                        if(!info){alert('每个人只能表达一次赞或踩');}
                        const comment=info;
                        const comments=this.state.comments.slice();
                        comments.forEach(c=>{
                            if(c.id==comment.id){
                                c.downvotes=comment.downvotes;
                            }
                        })
                        this.setState({comments:comments});
                    })
                }}
            />
            <Pagination current={this.state.page} size={this.state.size} total={this.state.count} 
                onChange={(page)=>{
                    const {scope,topicId,replyTo}=this.props;
                    this.props.fetchCommentList(scope,topicId,replyTo,page,this.state.size)
                        .then(result=>{
                            const {comments,count}=result;
                            this.setState({ comments,count,page });
                        });
                }}
            />
        </div>);
    }
}

/**
 * 从服务器获取评论列表
 * @param {String} scope 主题域
 * @param {Number} topicId 主题ID
 * @param {Number} replyTo 所回复评论的ID，即向哪个评论回复
 * @param {Number} page 评论分页页码
 * @param {Number} size 评论分页每页数量
 */
function _fetchCommentList(scope,topicId,replyTo,page=1,size=8){
    return fetch("/comment/list",{
        method:'post',
        credentials:'same-origin',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({scope, topicId, replyTo,page, size, }),
    })
    .then(resp=>resp.json())
    .then(result=>{
        const comments=result.rows.map(c=>{
            c.author.name=c.author.username;
            return c;
        });
        const count=result.count;
        return {comments,count};
    });
}

/**
 * 提交创建评论的请求
 */
function _create(scope,topicId,replyTo,content){
    return fetch(`/comment/new`,{
        method:'post',
        credentials:'same-origin',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({ scope, topicId, replyTo,content})
    })
    .then(resp=>resp.json())
}


function _onUpvote(commentId){
    return fetch("/comment/upvote",{
        method:'post',
        credentials:'same-origin',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({id:commentId}),
    })
    .then(resp=>resp.json())
    .then(info=>{
        if(!info){
            return false;
        }else{
            return info[0];
        }
    });
}

function _onDownvote(commentId){
    return fetch("/comment/downvote",{
        method:'post',
        credentials:'same-origin',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({id:commentId}),
    })
    .then(resp=>resp.json())
    .then(info=>{
        if(!info){
            return false;
        }else{
            return info[0];
        }
    });
}



Comment.defaultProps={
    /**
        * 评论组件下的诸多条评论所对应的主题ID
        */
    topicId:null,
    /**
        * 评论组件下的诸多评论所对应的域标识
        */
    scope:'post',
    /**
     * 回复于哪个评论
     */
    replyTo:null,
    /**
        * 获取评论列表
        */
    fetchCommentList:_fetchCommentList,
    /**
        * 创建新评论
        */
    create:_create,
    /**
        * 投票支持某条评论
        */
    onUpvote:_onUpvote,
    /**
        * 投票反对某条评论
        */
    onDownvote:_onDownvote,
};



export default Comment;