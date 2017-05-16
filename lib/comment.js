import React from 'react';
import 'whatwg-fetch';
import Pagination from 'simple-react-ui/dist/pagination';
import {CommentForm}  from './comment-form';
import {CommentItem} from './comment-item';
import {configFn}  from './default-fn';


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


    _handleUpvote(id){
        return this.props.onUpvote(id)
            .then(info=>{
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
            });
    }

    _handleDownVote(id){
        return this.props.onDownvote(id)
            .then(info=>{
                if(!info){alert('每个人只能表达一次赞或踩');}
                const comment=info;
                const comments=this.state.comments.slice();
                comments.forEach(c=>{
                    if(c.id==comment.id){
                        c.downvotes=comment.downvotes;
                    }
                })
                this.setState({comments:comments});
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

            {/* comment list */}
            <div>
                {this.state.comments.map((c,i)=>{
                    return <CommentItem key={i} 
                        scope={this.props.scope} topicId={this.props.topicId} replyTo={this.props.replyTo}
                        id={c.id} author={c.author} content={c.content}
                        createdAt={c.createdAt} updatedAt={c.updatedAt}
                        upvotes={c.upvotes} downvotes={c.downvotes}
                        onUpvote={()=>{ this._handleUpvote(c.id); }} 
                        onDownvote={(id)=>{this._handleDownVote(c.id); }} 
                    />;
                })}
            </div>
            
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


// 获取默认配置的若干函数作为组件的默认属性
const {create,fetchCommentList,onUpvote,onDownvote}=configFn();

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
    fetchCommentList:fetchCommentList,
    /**
        * 创建新评论
        */
    create:create,
    /**
        * 投票支持某条评论
        */
    onUpvote:onUpvote,
    /**
        * 投票反对某条评论
        */
    onDownvote:onDownvote,
};



export default Comment;