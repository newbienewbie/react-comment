import React from 'react';
import 'whatwg-fetch';
import Pagination from 'simple-react-ui/dist/pagination';
import {CommentForm}  from './comment-form';
import {CommentItem} from './comment-item';
import {initialLoadFetch,createComment,createReply,upvote,downvote,fetchCommentList,fetchFirstPageReplyList,fetchReplyListOfComment,replyListPageChanged} from '../../actions';


/**
 * Comment 组件，由评论表单、评论列表、分页三部分构成
 */
export class Comment extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        const {scope,topicId,currentCommentPage,commentPageSize,replyPageSize}=this.props;
        const action=fetchCommentList(scope,topicId,currentCommentPage,commentPageSize);
        this.props.dispatch(action);
        const replyListAction=fetchFirstPageReplyList(scope,topicId,currentCommentPage,commentPageSize,replyPageSize);
        this.props.dispatch(replyListAction);
    }

    getRepliesOfComment(replies,comment){
        let result={rows:[],count:0};
        if(!comment || ! comment.hasOwnProperty('id')){
            return result;
        }
        if(!replies || ! replies[comment.id]){
            return result;
        }
        return replies[comment.id];
    }

    render() {
        return (<div>
            <CommentForm replyTo={this.props.replyTo} author={{avatarUrl:''}} 
                onSubmit={arg=>{
                    const {content,replyTo}=arg;
                    const {scope,topicId}=this.props;
                    return this.props.dispatch(createComment(scope,topicId,replyTo,content))
                        .then(_=>{
                            const page=this.props.currentCommentPage;
                            const size=this.props.commentPageSize;
                            const action=fetchCommentList(scope,topicId,page,size);
                            return this.props.dispatch(action);
                        });
                }} 
            />

            <div>
                {this.props.comments.map((c,i)=>{
                    const {scope,topicId,replyTo}=this.props;
                    return <CommentItem key={i} 
                        scope={scope} topicId={topicId} replyUnder={null}
                        id={c.id} author={c.author} content={c.content}
                        createdAt={c.createdAt} updatedAt={c.updatedAt}
                        upvotes={c.upvotes} downvotes={c.downvotes}
                        onUpvote={()=>{ 
                            const action=upvote(c.id);
                            this.props.dispatch(action); 
                        }} 
                        onDownvote={(id)=>{
                            const action=downvote(c.id);
                            this.props.dispatch(action);
                        }} 
                        replies={this.getRepliesOfComment(this.props.replies,c)}
                        onReply={(scope,topicId,replyTo,content)=>{
                            return this.props.dispatch(createReply(scope,topicId,replyTo,content))
                                .then(reply=>{
                                    const page=1;
                                    const size=this.props.replyPageSize;
                                    const action=fetchReplyListOfComment(scope,topicId,reply.replyUnder,page,size);
                                    return this.props.dispatch(action);
                                });
                        }}
                        onPageChange={(scope,topicId,replyUnder,page,size)=>{
                            const action=fetchReplyListOfComment(scope,topicId,replyUnder,page,size);
                            return this.props.dispatch(action)
                                .then(_=>{
                                    this.props.dispatch(replyListPageChanged(replyUnder,page));
                                });
                        }}
                    />;
                })}
            </div>
            
            <Pagination current={this.props.currentCommentPage} size={this.props.commentPageSize} total={this.props.commentsCount} 
                onChange={(page)=>{
                    const {scope,topicId,replyTo}=this.props;
                    const size=this.props.commentPageSize;
                    const fetchCommentListAction=fetchCommentList(scope,topicId,page,size);
                    return this.props.dispatch(fetchCommentListAction);
                }}
            />
        </div>);
    }
}

Comment.defaultProps={
    
    /**
     * 评论组件下的诸多评论所对应的域标识
     */
    scope:'post',

    /**
     * 评论组件下的诸多条评论所对应的主题ID
     */
    topicId:null,
    
    comments:[
        {id:null,author:{name:'',email:'',avatarUrl:'#',introduction:'',},content:'',createdAt:new Date(),updatedAt:new Date(),upvotes:0,downvotes:0,},
    ],
    replies:[],

    commentsCount:0,
    /**
     * 顶级评论默认分页大小
     */
    currentCommentPage:1,
    commentPageSize:10,
};


export default Comment;